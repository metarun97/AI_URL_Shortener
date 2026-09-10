import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import urlModel from '../src/models/url.model.js';
import '../src/models/user.model.js';

const redisClient = {
  isOpen: false,
  get: jest.fn(),
  set: jest.fn(),
  hGet: jest.fn(),
  hSet: jest.fn(),
  hIncrBy: jest.fn(),
  expire: jest.fn(),
  del: jest.fn(),
};

jest.unstable_mockModule('../src/db/redis.js', () => ({ default: redisClient }));

const {
  createShortUrl,
  redirectShortUrl,
  deleteUrl,
  getAllUsersUrl,
} = await import('../src/controllers/url.controller.js');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await urlModel.deleteMany({});
  redisClient.isOpen = false;
  Object.values(redisClient).forEach((method) => {
    if (typeof method === 'function') method.mockReset();
  });
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const buildRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  redirect: jest.fn().mockReturnThis(),
});

describe('createShortUrl controller', () => {
  it('returns 401 when the user is not authenticated', async () => {
    const res = buildRes();

    await createShortUrl({ body: { full_url: 'https://example.com' } }, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Unoutherized:User not found',
    });
  });

  it('returns 409 when the URL already exists', async () => {
    const userId = new mongoose.Types.ObjectId();
    await urlModel.create({
      originalUrl: 'https://example.com',
      shortCode: 'existing',
      user: userId,
    });
    const res = buildRes();

    await createShortUrl({
      body: { full_url: 'https://example.com' },
      user: { id: userId.toString() },
    }, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'URL alredy exists' });
  });

  it('creates a short URL for the authenticated user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const res = buildRes();

    await createShortUrl({
      body: { full_url: 'https://example.com/new' },
      user: { id: userId.toString() },
    }, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Short URL created successfully',
      user: userId.toString(),
      newUrl: expect.objectContaining({
        full_url: 'https://example.com/new',
        user: userId,
      }),
    }));
  });
});

describe('redirectShortUrl controller', () => {
  it('redirects from the Redis cache and increments cached clicks', async () => {
    redisClient.isOpen = true;
    redisClient.hGet.mockResolvedValue('https://example.com/cached');
    const res = buildRes();

    await redirectShortUrl({ params: { shortCode: 'cached1' } }, res);

    expect(redisClient.hIncrBy).toHaveBeenCalledWith('url:cached1', 'clicks', 1);
    expect(res.redirect).toHaveBeenCalledWith('https://example.com/cached');
  });

  it('returns 404 when the short URL does not exist', async () => {
    redisClient.hGet.mockResolvedValue(null);
    const res = buildRes();

    await redirectShortUrl({ params: { shortCode: 'missing' } }, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'URL not found' });
  });

  it('redirects from MongoDB and increments clicks on a cache miss', async () => {
    const url = await urlModel.create({
      originalUrl: 'https://example.com/database',
      shortCode: 'db12345',
      user: new mongoose.Types.ObjectId(),
      clicks: 2,
    });
    redisClient.hGet.mockResolvedValue(null);
    redisClient.hSet.mockResolvedValue('OK');
    redisClient.expire.mockResolvedValue(true);
    const res = buildRes();

    await redirectShortUrl({ params: { shortCode: 'db12345' } }, res);

    expect(redisClient.hSet).toHaveBeenCalledWith('url:db12345', {
      full_url: 'https://example.com/database',
      clicks: '2',
    });
    expect(res.redirect).toHaveBeenCalledWith('https://example.com/database');
    await expect(urlModel.findById(url._id)).resolves.toEqual(expect.objectContaining({ clicks: 3 }));
  });
});

describe('deleteUrl controller', () => {
  it('returns 404 when the URL does not belong to the user', async () => {
    const res = buildRes();

    await deleteUrl({
      params: { id: new mongoose.Types.ObjectId().toString() },
      user: { id: new mongoose.Types.ObjectId().toString() },
    }, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Url not found & you are not authorized to delete it',
    });
  });

  it('deletes the URL and clears the user cache', async () => {
    const userId = new mongoose.Types.ObjectId();
    const url = await urlModel.create({
      originalUrl: 'https://example.com/delete',
      shortCode: 'delete1',
      user: userId,
    });
    const res = buildRes();

    await deleteUrl({ params: { id: url._id.toString() }, user: { id: userId.toString() } }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(redisClient.del).toHaveBeenCalledWith(`user:urls:${userId}`);
    await expect(urlModel.findById(url._id)).resolves.toBeNull();
  });
});

describe('getAllUsersUrl controller', () => {
  it('returns only the urls belonging to the authenticated user', async () => {
    const userId = new mongoose.Types.ObjectId();
    const otherUserId = new mongoose.Types.ObjectId();

    await urlModel.create([
      { originalUrl: 'https://example.com/one', shortCode: 'abc123', user: userId, clicks: 1 },
      { originalUrl: 'https://example.com/two', shortCode: 'def456', user: otherUserId, clicks: 2 },
    ]);

    const req = {
      user: { id: userId.toString() },
    };
    const res = buildRes();

    await getAllUsersUrl(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 1,
        urls: expect.any(Array),
      })
    );

    const response = res.json.mock.calls[0][0];
    expect(response.urls[0].short_url).toBe('abc123');
  });
});
