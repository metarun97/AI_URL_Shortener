import { createSlice } from "@reduxjs/toolkit";
import { createUrlThunk, deleteUrlThunk, getAllUrlsThunk } from './urlThunk';

const initialState = {
  urls: [],
  loading: false,
  error: false,
}

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    deleteUrlReducer: (state) => {
      state.urls = null;
      state.loading = false;
      state.error = false;
    }
  },

  extraReducers: (builder) => {
    builder

      /* FOR-CREATE URL */
      .addCase(createUrlThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUrlThunk.fulfilled, (state, action) => {
        state.urls.push(action.payload);
        state.loading = false;
      })
      .addCase(createUrlThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FOR-GET ALL URLS */
      .addCase(getAllUrlsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUrlsThunk.fulfilled, (state, action) => {
        state.urls = action.payload;
        state.loading = false;
      })
      .addCase(getAllUrlsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FOR-DELETE A URL */
      .addCase(deleteUrlThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrlThunk.fulfilled, (state, action) => {
        const deleteId = action.meta.arg;
        state.urls = state.urls.filter(url => url._id !== deleteId);
        state.loading = false;
      })
      .addCase(deleteUrlThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})


export const { deleteUrlReducer } = urlSlice.actions;

export default urlSlice.reducer;
