import { jest } from '@jest/globals';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const redisStore = new Map();
const redisClient = {
  get: jest.fn(async (key) => redisStore.get(key)),
  set: jest.fn(async (key, value) => {
    redisStore.set(key, value);
    return 'OK';
  }),
};

jest.unstable_mockModule('../src/db/redis.js', () => ({ default: redisClient }));
jest.unstable_mockModule('../src/service/ai.service.js', () => ({
  checkUrlSafety: jest.fn(async () => JSON.stringify({
    isUrlSafe: true,
    risk: 'low',
    aiReason: 'Test URL is safe',
  })),
}));

process.env.JWT_SECRET = 'url-test-secret';
process.env.BASE_URL = 'http://localhost:3000';
process.env.NODE_ENV = 'test';

const { default: app } = await import('../src/app.js');
const { default: userModel } = await import('../src/models/user.model.js');
const { default: urlModel } = await import('../src/models/url.model.js');

let mongoServer;
let server;
let baseUrl;
let consoleErrorSpy;

const api = async (method, path, body, cookie, redirect = 'follow') => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    redirect,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const contentType = response.headers.get('content-type') || '';

  return {
    status: response.status,
    body: contentType.includes('application/json') ? await response.json() : await response.text(),
    headers: response.headers,
  };
};

const createUser = async (username = `url-user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`) => {
  const user = await userModel.create({
    username,
    email: `${username}@example.com`,
    password: await bcrypt.hash('password123', 10),
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return { user, cookie: `token=${token}` };
};

const createUrl = async (user, values = {}) => urlModel.create({
  originalUrl: values.originalUrl || 'https://example.com/article',
  shortCode: values.shortCode || `code-${Math.random().toString(36).slice(2, 8)}`,
  isUrlSafe: values.isUrlSafe ?? true,
  risk: values.risk || 'low',
  aiReason: values.aiReason || 'Test URL is safe',
  user: user._id,
  clicks: values.clicks || 0,
});

beforeAll(async () => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  server = await new Promise((resolve) => {
    const listeningServer = app.listen(0, () => resolve(listeningServer));
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  await urlModel.deleteMany({});
  await userModel.deleteMany({});
  redisStore.clear();
  jest.clearAllMocks();
});

afterAll(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await mongoose.disconnect();
  await mongoServer.stop();
  consoleErrorSpy.mockRestore();
});

describe('URL API', () => {
  test('creates a short URL for an authenticated user', async () => {
    const { user, cookie } = await createUser();

    const response = await api('POST', '/api/url/create', {
      originalUrl: 'https://example.com/docs',
    }, cookie);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      message: 'Short URL created successfully',
      originalUrl: 'https://example.com/docs',
      user: user._id.toString(),
      shortCode: expect.any(String),
      newUrl: { isUrlSafe: true, risk: 'low', aiReason: 'Test URL is safe' },
    });
    await expect(urlModel.findOne({ originalUrl: 'https://example.com/docs' }))
      .resolves.toMatchObject({ user: user._id });
  });

  test('rejects URL creation without authentication', async () => {
    const response = await api('POST', '/api/url/create', {
      originalUrl: 'https://example.com/docs',
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Unotherized: token is required' });
  });

  test('rejects a duplicate URL for the same user', async () => {
    const { user, cookie } = await createUser();
    await createUrl(user, { originalUrl: 'https://example.com/duplicate' });

    const response = await api('POST', '/api/url/create', {
      originalUrl: 'https://example.com/duplicate',
    }, cookie);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: 'URL alredy exists' });
  });

  test('redirects to a stored URL and increments clicks', async () => {
    const { user } = await createUser();
    const url = await createUrl(user, { shortCode: 'redirect-me' });

    const response = await api('GET', '/api/url/redirect-me', undefined, undefined, 'manual');

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe(url.originalUrl);
    await expect(urlModel.findById(url._id)).resolves.toMatchObject({ clicks: 1 });
  });

  test('returns 404 when a short URL does not exist', async () => {
    const response = await api('GET', '/api/url/missing-code', undefined, undefined, 'manual');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'URL not found' });
  });

  test('deletes a URL owned by the authenticated user', async () => {
    const { user, cookie } = await createUser();
    const url = await createUrl(user);

    const response = await api('DELETE', `/api/url/${url._id}`, undefined, cookie);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ messsage: 'Url deleted successfully' });
    await expect(urlModel.findById(url._id)).resolves.toBeNull();
  });

  test('does not delete a URL owned by another user', async () => {
    const owner = await createUser('url-owner');
    const otherUser = await createUser('url-other-user');
    const url = await createUrl(owner.user);

    const response = await api('DELETE', `/api/url/${url._id}`, undefined, otherUser.cookie);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Url not found & you are not authorized to delete it' });
    await expect(urlModel.findById(url._id)).resolves.not.toBeNull();
  });

  test('lists only the authenticated user URLs', async () => {
    const currentUser = await createUser('list-owner');
    const otherUser = await createUser('list-other');
    await createUrl(currentUser.user, { shortCode: 'mine' });
    await createUrl(otherUser.user, { shortCode: 'not-mine' });

    const response = await api('GET', '/api/url/', undefined, currentUser.cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('URLs fetched successfully');
    expect(response.body.count).toBe(1);
    expect(response.body.urls).toHaveLength(1);
    expect(response.body.urls[0]).toMatchObject({ shortCode: 'mine' });
  });

  test('rejects listing URLs without authentication', async () => {
    const response = await api('GET', '/api/url/');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Unotherized: token is required' });
  });
});
