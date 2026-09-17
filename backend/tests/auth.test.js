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
jest.unstable_mockModule('../src/config/genAI.credentials.js', () => ({ default: {} }));

process.env.JWT_SECRET = 'auth-test-secret';
process.env.NODE_ENV = 'test';

const { default: app } = await import('../src/app.js');
const { default: userModel } = await import('../src/models/user.model.js');

let mongoServer;
let server;
let baseUrl;
let consoleErrorSpy;

const validUser = () => ({
  username: `test-user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  email: `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}@example.com`,
  password: 'password123',
});

const api = async (method, path, body, cookie) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  return {
    status: response.status,
    body: await response.json(),
    headers: response.headers,
  };
};

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

describe('Auth API', () => {
  test('registers a user and sets an auth cookie', async () => {
    const user = validUser();
    const response = await api('POST', '/api/auth/register', user);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      message: 'User registered successfully',
      user: { username: user.username, email: user.email },
    });
    expect(response.headers.get('set-cookie')).toMatch(/^token=/);
    await expect(userModel.findOne({ email: user.email }).select('+password'))
      .resolves.toMatchObject({ username: user.username });
  });

  test('rejects duplicate username or email', async () => {
    const user = validUser();
    expect((await api('POST', '/api/auth/register', user)).status).toBe(201);

    const response = await api('POST', '/api/auth/register', user);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: 'User already exists' });
  });

  test('rejects invalid registration input', async () => {
    const response = await api('POST', '/api/auth/register', {
      username: 'ab', email: '', password: 'short',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(expect.any(Array));
    expect(await userModel.countDocuments()).toBe(0);
  });

  test('logs in with valid credentials and sets an auth cookie', async () => {
    const user = validUser();
    await userModel.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    const response = await api('POST', '/api/auth/login', {
      email: user.email, password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'User logged in successfully',
      user: { username: user.username, email: user.email },
    });
    expect(response.headers.get('set-cookie')).toMatch(/^token=/);
  });

  test('rejects login for an unknown user and a wrong password', async () => {
    const user = validUser();
    await userModel.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });

    const unknownUserResponse = await api('POST', '/api/auth/login', {
      email: 'missing@example.com', password: user.password,
    });
    const wrongPasswordResponse = await api('POST', '/api/auth/login', {
      email: user.email, password: 'wrong-password',
    });

    expect(unknownUserResponse.status).toBe(401);
    expect(wrongPasswordResponse.status).toBe(401);
  });

  test('returns the authenticated user from get-me', async () => {
    const user = validUser();
    const savedUser = await userModel.create({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

    const response = await api('GET', '/api/auth/get-me', undefined, `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Current User fetched successfully',
      user: { username: user.username, email: user.email },
    });
  });

  test('rejects get-me without an auth cookie', async () => {
    const response = await api('GET', '/api/auth/get-me');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Unotherized: token is required' });
  });

  test('logs out and clears the auth cookie', async () => {
    const token = jwt.sign({ id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET);
    const response = await api('POST', '/api/auth/logout', undefined, `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User logout successfully' });
    expect(response.headers.get('set-cookie')).toMatch(/^token=;/);
  });

  test('rejects logout without a token', async () => {
    const response = await api('POST', '/api/auth/logout');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ success: true, message: 'token not fond' });
  });
});
