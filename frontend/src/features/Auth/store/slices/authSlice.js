import { createSlice } from "@reduxjs/toolkit";
import { getMeThunk, loginThunk, logoutThunk, registerThunk } from "../thunks/thunk";


/* Initial state of authSlice */
const initialState = {
  user: null,
  isAuthenticated: false,
  initializing: true,
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
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      /* FOR - LOGIN  */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
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
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* FOR LOGOUT */
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

})

export const { logoutReducer } = authSlice.actions;

export default authSlice.reducer;
