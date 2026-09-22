import { api } from "../../../utils/axiosInstance";


/* Create Url API */
export const createUrl = async ({ originalUrl }) => {
  try {
    const response = await api.post("/api/url/create", { originalUrl });

    return response.data;

  } catch (error) {

    console.log("URL creation Error:", error);

  }
}


/* Get all urls API */
export const getAllUrls = async () => {
  try {
    const response = await api.get("/api/url/");

    return response.data;

  } catch (error) {

    console.log("Get all URLs Error:", error);

  }
}


/* Redirect to Url API */
export const deleteUrl = async (id) => {
  try {
    const response = await api.delete(`/api/url/${id}`);
    return response.data;

  } catch (error) {

    console.log("URL deletion Error:", error);

  }
}
