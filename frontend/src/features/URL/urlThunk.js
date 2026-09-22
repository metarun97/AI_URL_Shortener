import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUrl, deleteUrl, getAllUrls } from "./services/url.api";


/* Create URL Thunk */
export const createUrlThunk = createAsyncThunk("url/createUrlThunk", async (urlData, thunkApi) => {
  try {
    const responseData = await createUrl(urlData);
    return responseData.url;

  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "Fail to create URL")

  }
})


/* Fetch all URLs Thunk */
export const getAllUrlsThunk = createAsyncThunk("url/getAllUrlsThunk", async (_, thunkApi) => {
  try {
    const responseData = await getAllUrls();
    return responseData.urls;


  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "Fail to fetch all URLs")

  }
})

/* Delete URL Thunk */
export const deleteUrlThunk = createAsyncThunk("url/deleteUrlThunk", async (id, thunkApi) => {
  try {
    const responseData = await deleteUrl(id);
    return responseData.url;

  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "Fail to delete URL")
  }
})
