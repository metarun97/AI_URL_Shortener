// Imported items:-
import urlModel from "../models/url.model.js";
import { createShortUrlService } from "../service/shortUrl.service.js";
import redisClient from '../db/redis.js';


//* createShortUrl API Controller:-
export const createShortUrl = async (req, res) => {
  try {
    const { full_url, originalUrl } = req.body;
    const userId = req?.user?.id;
    const urlToCreate = full_url || originalUrl;

    // Check for user:-
    if (!userId) {
      return res.status(401).json({
        message: "Unoutherized:User not found",
      });
    }

    // Check if URL already exists:-
    const urlExists = await urlModel.findOne({
      originalUrl: urlToCreate,
      user: userId,
    });

    if (urlExists) {
      return res.status(409).json({
        message: "URL alredy exists",
      });
    }

    // Create URL in MongoDB:-
    const newUrl = await createShortUrlService(urlToCreate, userId);
    const responseNewUrl = {
      _id: newUrl._id,
      full_url: newUrl.originalUrl,
      short_url: newUrl.shortCode,
      user: newUrl.user,
    };

    // Redis cache key:-
    const cacheKey = `url:${newUrl.shortCode}`;

    // Store URL in Redis:-
    await redisClient.hSet(cacheKey, {
      originalUrl: newUrl.originalUrl,
      clicks: String(newUrl.clicks || 0),
    });

    // Cache expiry time = 1 hour:-
    await redisClient.expire(cacheKey, 60 * 60);

    // final response:-
    return res.status(201).json({
      message: "Short URL created successfully",
      id: newUrl._id,
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
      user: userId,
      newUrl: responseNewUrl,
    });

  } catch (error) {
    console.error("URL creation error", error);
    return res.status(500).json({
      message: "Unable to create URL",
    });
  }
};


//* redirectShortUrl API Controller:-
export const redirectShortUrl = async (req, res) => {
  try {
    const shortUrlId = req.params.shortCode || req.params.shortedId;

    //  Redis key:-
    const cacheKey = `url:${shortUrlId}`;

    // Redis se originalUrl nikalo:-
    const cachedUrl = await redisClient.hGet(cacheKey, "originalUrl") || await redisClient.hGet(cacheKey, "full_url");

    //  Redis HIT (If cachedUrl not found then skip this part till return redirection):-
    if (cachedUrl) {
      console.log("redis hit");
      await redisClient.hIncrBy(cacheKey, "clicks", 1);
      await urlModel.updateOne(
        { shortCode: shortUrlId },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(cachedUrl);
    }

    // If Redis missing shortCode by MongoDb:-
    const url = await urlModel.findOne({ shortCode: shortUrlId });

    // if url not found:-
    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    // MongoDB se mila URL Redis me cache karo:-
    await redisClient.hSet(cacheKey, {
      full_url: url.originalUrl,
      clicks: String(url.clicks || 0),
    });

    // Redis cache expiry time = 1 hour:-
    await redisClient.expire(cacheKey, 60 * 60);

    // Click count MongoDB me increase:-
    await urlModel.updateOne(
      { _id: url._id },
      { $inc: { clicks: 1 } }
    );

    // Redis me bhi click increase:-
    await redisClient.hIncrBy(cacheKey, "clicks", 1);

    // Redirect:-
    return res.redirect(url.originalUrl);

  } catch (error) {
    console.error("URL redirection error")
    return res.status(500).json({
      message: "Unable to redirect on URL",
    });
  }
};


//* getAllUsersUrl API Controller:-
export const userUrls = async (req, res) => {
  try {
    const userId = req?.user?.id;

    // If userId not found means user Unauthorized:-
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    // If urls not found in cache then get from mongoDB:-
    const urls = await urlModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user")
      .lean();

    const mappedUrls = urls.map((url) => ({
      ...url,
      full_url: url.originalUrl,
      short_url: url.shortCode,
    }));

    // Final response:-
    return res.status(200).json({
      count: mappedUrls.length,
      urls: mappedUrls,
    });
  } catch (error) {
    console.error("All URLs fetching Error ", error);
    return res.status(500).json({
      message: "Unable to fetch All URLs",
    });
  }
};


//* deleteSingleUrl API Controller:-
export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    /* Find url by it's id and user */
    const url = await urlModel.findOne({
      _id: id,
      user: userId,
    });

    if (!url) {
      return res.status(404).json({
        message: "Url not found & you are not authorized to delete it",
      });
    }

    /* Delete that url which id matched  */
    await urlModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    await redisClient.del(`user:urls:${userId}`);

    /* Final response */
    return res.status(200).json({
      messsage: "Url deleted successfully",
    });
  } catch (error) {
    console.error("URL deletion Error:", error)
    return res.status(500).json({
      message: "Unable to delete URL",
    });
  }
};


