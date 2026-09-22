// Imported items:-
import urlModel from "../models/url.model.js";
import { createShortUrlService } from "../service/shortUrl.service.js";
import { checkUrlSafety } from '../service/ai.service.js';


/**
 * @name createShortUrlController
 * @description create a new shortUrl expects originalUrl in req.body
 * @access private
 */
export const createShortUrlController = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user?.id;


    /* Check for user */
    if (!userId) {
      return res.status(401).json({
        message: "Unoutherized: User not found",
      });
    }

    /* Url check for conflict */
    const urlExists = await urlModel.findOne({
      originalUrl: originalUrl,
      user: userId,
    });

    if (urlExists) {
      return res.status(409).json({
        message: "URL alredy exists",
      });
    }

    /* url safety check by Gemini AI */
    let safetyRes;
    try {
      safetyRes = await checkUrlSafety(originalUrl);

    } catch (error) {
      /* If Gemini then execute this */
      console.log("AI check failed:", error.message);
    }

    const { isUrlSafe, risk, aiReason } = safetyRes;

    /* Create shorUrl in MongoDB */
    const newUrl = await createShortUrlService(originalUrl, userId, isUrlSafe, risk, aiReason);

    // final response:-
    return res.status(201).json({
      message: "Short URL created successfully",
      url: {
        id: newUrl._id,
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,
        shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
      },
      safety: {
        isUrlSafe: newUrl.isUrlSafe,
        risk: newUrl.risk,
        aiReason: newUrl.aiReason,
      }

    });

  } catch (error) {
    console.error("URL creation error", error);

    return res.status(500).json({
      message: "Unable to create URL",
    });
  }

};


/**
 * @name redirectShortUrlController
 * @description user can redirect to created shortUrl
 * @access public
 */
export const redirectShortUrlController = async (req, res) => {
  try {
    const shortUrlId = req.params.shortCode;

    /* Url check for availabelity */
    const url = await urlModel.findOne({ shortCode: shortUrlId });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    /* If url found redirect and inc clicks */
    await urlModel.updateOne(
      { _id: url._id },
      { $inc: { clicks: 1 } }
    );

    return res.redirect(url.originalUrl);

  } catch (error) {
    console.error("URL redirection error");

    return res.status(500).json({
      message: "Unable to redirect on URL",
    });

  }
};


/**
 * @name allUrlsConroller
 * @description get all created shortUrl by current user
 * @access private
 */
export const allUrlsConroller = async (req, res) => {
  try {
    const userId = req.user?.id;


    /* Check for user */
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    /* Fetch all created shorUrls from MongoDB database */
    const urls = await urlModel.find({ user: userId })
      .sort({ createdAt: -1 }).populate("user").lean();


    /* Final response */
    return res.status(200).json({
      message: "URLs fetched successfully",
      count: urls.length,
      urls: urls,
    });

  } catch (error) {
    console.error("All URLs fetching Error ", error);
    return res.status(500).json({
      message: "Unable to fetch All URLs",
    });
  }
};


/**
 * @name deleteUrlController
 * @description currentUser can delete shortUrl which is created
 * @access private
 */
export const deleteUrlController = async (req, res) => {
  try {
    const { id } = req?.params;
    const userId = req.user?.id;
    // console.log(req.params)
    // console.log(id, userId)

    /* Check for URL by it's id and user */
    const url = await urlModel.findOne({
      _id: id,
      user: userId,
    });

    // console.log(url);

    if (!url) {
      return res.status(404).json({
        message: "Url not found & you are not authorized to delete it",
      });
    }

    /* Check for delete the URL  */
    await urlModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

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
