import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUrl, deleteUrl, getAllUrls } from "./services/url.api";


/* Create URL Thunk */
export const createUrlThunk = createAsyncThunk("url/createUrl", async (data, { rejectWithValue }) => {
  try {
    const response = await createUrl(data);

    return response;

  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "Fail to create URL")

  }
})


/* Fetch all URLs Thunk */
export const getAllUrlsThunk = createAsyncThunk("url/getAllUrls", async (_, { rejectWithValue }) => {
  try {
    const resonse = await getAllUrls();

    return resonse.urls;

  } catch (error) {

    return rejectWithValue(error?.resonse?.data?.message || "Fail to fetch all URLs")

  }
})


/* Delete URL Thunk */
export const deleteUrlThunk = createAsyncThunk("url/deleteUrl", async (id, { rejectWithValue }) => {
  try {
    const response = await deleteUrl(id);

    return response.url;

  } catch (error) {

    return rejectWithValue(error?.resonse?.data?.message || "Fail to delete URL")

  }
})
