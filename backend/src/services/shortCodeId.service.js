import { nanoid } from "nanoid";

/* Generate ShortCodeId */
const generateShortCodeId = (originalUrl, userId) => {

  const shortCodeId = nanoid(7);

  return shortCodeId;
}

export default generateShortCodeId;
