import urlModel from "../models/url.model.js";
import aiUrlSafetyCheck from "../services/ai.service.js";
import generateShortCodeId from '../services/shortCodeId.service.js';


/**
 * @name createShortUrl
 * @description create a new shortUrl expects originalUrl in req.body
 * @access private
 */
export const createShortUrl = async (req, res) => {

  try {
    const { originalUrl } = req.body;
    const userId = req.user?.id;


    /* Check for user */
    if (!userId) {
      return res.status(404).json({
        message: "User not found!",
      })
    }

    /* Url check for conflict */
    const urlExists = await urlModel.findOne({
      originalUrl: originalUrl,
      user: userId,
    });

    if (urlExists) {
      return res.status(409).json({
        message: "URL already exists!",
      })
    }

    /* Create shorUrl in MongoDB */
    const shortCodeId = generateShortCodeId(originalUrl, userId);


    /* AI URL safety check */
    const URlSafety = await aiUrlSafetyCheck(originalUrl);



    /* Creating newShortUrl */
    const newUrl = await urlModel.create({
      originalUrl: originalUrl,
      shortCode: shortCodeId,
      user: userId,
      isUrlSafe: URlSafety?.isUrlSafe,
      risk: URlSafety?.risk,
      aiReason: URlSafety?.aiReason
    });



    /* final response */
    return res.status(201).json({
      message: "Short URL created successfully!",
      originalUrl: newUrl.originalUrl,
      user: userId.toString(),
      shortCode: newUrl.shortCode,
      newUrl: {
        isUrlSafe: newUrl.isUrlSafe,
        risk: newUrl.risk,
        aiReason: newUrl.aiReason,
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error!",
    });
  } finally {
    console.timeEnd("TOTAL_REQUEST");
  }
};


/**
 * @name redirectShortUrl
 * @description user can redirect to created shortUrl
 * @access public
 */
export const redirectShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    /* Url check for availablity */
    const url = await urlModel.findOne({ shortCode });


    if (!url) {
      return res.status(404).json({
        message: "URL not found!",
      })
    }

    /* If url found redirect and inc clicks */
    await urlModel.updateOne(
      { _id: url._id },
      { $inc: { clicks: 1 } }
    );

    return res.redirect(url.originalUrl);


  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error!",
    });

  }
};


/**
 * @name meUserUrls
 * @description get all created shortUrls of current user
 * @access private
 */
export const meUserUrls = async (req, res) => {
  try {
    const userId = req.user?.id;

    /* Check for user */
    if (!userId) {
      return res.status(404).json({
        message: "User not found!",
      })

    }

    /* Fetch all created shorUrls from MongoDB database */
    const urls = await urlModel.find({ user: userId })
      .sort({ createdAt: -1 }).populate("user").lean();


    /* Final response */
    return res.status(200).json({
      message: "URLs fetched successfully!",
      count: urls.length,
      urls: urls,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};


/**
 * @name deleteUrl
 * @description currentUser can delete shortUrl which was created by him/her
 * @access private
 */
export const deleteUrl = async (req, res) => {
  try {
    const { id } = req?.params;
    const userId = req.user?.id;

    /* Check for URL by it's id and user */
    const url = await urlModel.findOne({
      _id: id,
      user: userId,
    });

    if (!url) {
      return res.status(403).json({
        message: "Access denied!"
      })
    }

    /* Check for delete the URL  */
    await urlModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    /* Final response */
    return res.status(200).json({
      messsage: "Url deleted successfully!",
    });

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};
