// Imported items:-
import urlModel from "../models/url.model.js";
import { generateNanoId } from "../utils/genrateUniqueId.js";

// createShortUrlService:-
export const createShortUrlService = async (originalUrl, userId) => {
  const shortCodeId = generateNanoId(7);

  // creating newUrl:-
  const newUrl = await urlModel.create({
    originalUrl,
    shortCode: shortCodeId,
    user: userId,
  });

  return newUrl;
};
