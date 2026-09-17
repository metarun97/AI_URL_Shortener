import { nanoid } from "nanoid"

/* Generate uniqueId by nanoId */
export const generateNanoId = (length) => {
  return nanoid(length);
}
