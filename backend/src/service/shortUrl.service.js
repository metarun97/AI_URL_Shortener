// Imported items:-
import urlModel from "../models/url.model.js";
import { generateNanoId } from "../utils/genrateUniqueId.js";

/* createShortUrlService created */
export const createShortUrlService = async (originalUrl, userId, isUrlSafe = false, risk = "", aiReason = "") => {
  const shortCodeId = generateNanoId(7);

  /* Creating newShortUrl */
  const newShortUrl = await urlModel.create({
    originalUrl: originalUrl,
    shortCode: shortCodeId,
    isUrlSafe: isUrlSafe,
    risk: risk,
    aiReason: aiReason,
    user: userId,
  });
  return newShortUrl;
};
