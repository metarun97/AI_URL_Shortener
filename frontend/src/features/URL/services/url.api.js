import { api } from "../../../utils/axiosInstance";


/* Create Url API */
export const createUrl = async (data) => {
  try {
    const response = await api.post("/api/url/create", data);

    return response.data;

  } catch (error) {

    throw error;

  }
}


/* Redirect Url API */
export const redirectUrl = async (shortCode) => {
  try {
    const response = await api.get(`/api/url/${shortCode}`, { maxRedirects: 0 });

    return response.data;

  } catch (error) {

    throw error;

  }
}


/* Get all urls API */
export const getAllUrls = async () => {
  try {
    const response = await api.get("/api/url/");

    return response.data;

  } catch (error) {

    throw error;

  }
}


/* Redirect to Url API */
export const deleteUrl = async (id) => {
  try {
    const response = await api.delete(`/api/url/${id}`);

    return response.data;

  } catch (error) {

    throw error;

  }
}
