import { createSlice } from "@reduxjs/toolkit";
import { createUrlThunk, deleteUrlThunk, getAllUrlsThunk } from './urlThunk';

const initialState = {
  urls: [],
  isLoading: false,
  error: false,
}

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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUrlThunk.fulfilled, (state, action) => {
        console.log(action.payload)
        state.urls.unshift(action.payload?.url);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUrlThunk.rejected, (state, action) => {
        console.log(action.payload)
        // state.isLoading = false;
        state.error = action.payload;
      })

      /* FOR-GET ALL URLS */
      .addCase(getAllUrlsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUrlsThunk.fulfilled, (state, action) => {
        state.urls = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllUrlsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* FOR-DELETE A URL */
      .addCase(deleteUrlThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUrlThunk.fulfilled, (state, action) => {
        const deleteId = action.meta.arg;
        state.urls = state.urls.filter(url => url._id !== deleteId);
        state.isLoading = false;
      })
      .addCase(deleteUrlThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})


export const { deleteUrlReducer } = urlSlice.actions;

export default urlSlice.reducer;
