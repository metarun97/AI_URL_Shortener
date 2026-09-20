import { createSlice } from "@reduxjs/toolkit";

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
  }
})


export const {deleteUrlReducer} = urlSlice.actions;

export default urlSlice.reducer;
