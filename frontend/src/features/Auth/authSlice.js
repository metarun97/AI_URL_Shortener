import { createSlice } from "@reduxjs/toolkit";
import { getMeThunk, signInThunk, signOutThunk, signUpThunk } from './authThunk';


/* Initial state of authSlice */
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

/* authSlice created */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutReducer: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },

  extraReducers: (builder) => {
    builder

      /* FOR-REGISTER */
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      /* FOR-LOGIN  */
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      })

      /* FOR-CURRENT USER */
      .addCase(getMeThunk.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* FOR LOGOUT */
      .addCase(signOutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

})

export const { logoutReducer } = authSlice.actions;

export default authSlice.reducer;
