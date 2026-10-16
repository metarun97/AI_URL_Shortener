import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUrl, deleteUrl, getAllUrls, redirectUrl } from "./services/url.api";


/* Create URL Thunk */
export const createUrlThunk = createAsyncThunk("url/createUrl", async (data, { rejectWithValue }) => {
  try {
    const response = await createUrl(data);

    return response;

  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "Fail to create URL")

  }
})


/* Redirect URL Thunk */
export const redirectUrlThunk = createAsyncThunk("url/redirectUrl", async (shortCode, { rejectWithValue }) => {

  try {
    const response = await redirectUrl(shortCode);

    console.log("Res data =>", response);

    return response;


  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "Fail to redirect to URL")

  }
})

/* Fetch all URLs Thunk */
export const getAllUrlsThunk = createAsyncThunk("url/getAllUrls", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllUrls();

    return response.urls;

  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "Fail to fetch all URLs")

  }
})


/* Delete URL Thunk */
export const deleteUrlThunk = createAsyncThunk("url/deleteUrl", async (id, { rejectWithValue }) => {
  try {
    const response = await deleteUrl(id);

    return response.url;

  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "Fail to delete URL")

  }
})
