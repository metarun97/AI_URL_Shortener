/* Imported items */
import axiosInstance from "../utils/axiosInstance";


/* Create shortUrl for user */
export const createShortUrl = async (url) => {
  const res = await axiosInstance.post('/api/url/create', {
    originalUrl: url,
  })
  // const { shortCode } = ;
  return res?.data?.newUrl?.shortCode;
}

// user All URLS:-
export const userAllUrls = async () => {
  const { data } = await axiosInstance.get("/api/url/")
  return data;
}

// delete a single URL:-
export const deleteSingleUrl = async (id) => {
  await axiosInstance.delete(`/api/url/${id}`);
}
