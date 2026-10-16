import { createSlice } from "@reduxjs/toolkit";
import { createUrlThunk, deleteUrlThunk, getAllUrlsThunk, redirectUrlThunk } from './urlThunk';


/* Initial state */
const initialState = {
  urls: [],
  urlLoading: false,
  error: false,
}

/* URL Slice created */
const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    deleteUrlReducer: (state) => {
      state.urls = null;
      state.isLoading = false;
      state.error = false;
    }
  },

  extraReducers: (builder) => {
    builder

      /* FOR-CREATE URL */
      .addCase(createUrlThunk.pending, (state) => {
        state.urlLoading = true;
        state.error = null;
      })
      .addCase(createUrlThunk.fulfilled, (state, action) => {
        state.urls.unshift(action?.payload);
        state.urlLoading = false;
        state.error = null;
      })
      .addCase(createUrlThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.error = action.payload;
      })

      /* FOR-GET ALL URLS */
      .addCase(getAllUrlsThunk.pending, (state) => {
        state.urlLoading = true;
        state.error = null;
      })
      .addCase(getAllUrlsThunk.fulfilled, (state, action) => {
        state.urls = action.payload;
        state.urlLoading = false;
        state.error = null;
      })
      .addCase(getAllUrlsThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.error = action.payload;
      })

      /* REDIRECT A URL */
      .addCase(redirectUrlThunk.pending, (state) => {
        state.urlLoading = true;
        state.error = null;
      })
      .addCase(redirectUrlThunk.fulfilled, (state, action) => {
        console.log(action.meta.arg)
        // const shortCodeId = action.meta.arg;
        // state.urls = action.payload;
        state.urlLoading = false;
      })
      .addCase(redirectUrlThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.error = action.payload;
      })

      /* FOR-DELETE A URL */
      .addCase(deleteUrlThunk.pending, (state) => {
        state.urlLoading = true;
        state.error = null;
      })
      .addCase(deleteUrlThunk.fulfilled, (state, action) => {
        const deleteId = action.meta.arg;
        state.urls = state.urls.filter(url => url._id !== deleteId);
        state.urlLoading = false;
      })
      .addCase(deleteUrlThunk.rejected, (state, action) => {
        state.urlLoading = false;
        state.error = action.payload;
      })
  }
})


export const { deleteUrlReducer } = urlSlice.actions;

export default urlSlice.reducer;
