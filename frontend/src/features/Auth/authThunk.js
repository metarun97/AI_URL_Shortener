import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, signIn, signOut, getMe } from "./services/auth.api";


/* SignUp Thunk */
export const signUpThunk = createAsyncThunk("auth/signUp", async (data, { rejectWithValue }) => {
  try {
    const response = await signUp(data);

    // return response.user;
    return response;

  } catch (error) {


    console.log("THUNK CATCH register:", error?.response?.data?.message);

    return rejectWithValue(error?.response?.data?.message || "SignUp failed")
  }
})


/* SignIn Thunk */
export const signInThunk = createAsyncThunk("auth/signIn", async (data, { rejectWithValue }) => {
  try {
    const response = await signIn(data);

    console.log("THUNK SUCCESS login:", response);

    return response;
    // return responseData.user;

  } catch (error) {
    console.log("THUNK CATCH:", error?.response?.data?.message);

    // throw error;
    return rejectWithValue(error?.response?.data.message || "SignIn failed")
  }
})


/* SignOut Thunk */
export const signOutThunk = createAsyncThunk("auth/signOut", async (_, { rejectWithValue }) => {
  try {
    const response = await signOut();

    return response;

  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "SignOut failed");

  }
})


/* GetMe Thunk */
export const getMeThunk = createAsyncThunk("auth/getMe", async (_, { rejectWithValue }) => {
  try {
    const response = await getMe();

    return response;

  } catch (error) {

    return rejectWithValue(error?.response?.data?.message || "User authentication failed")

  }
})
