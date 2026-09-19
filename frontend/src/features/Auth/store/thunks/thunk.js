import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe, login, logout, register } from "../../services/auth.service";


/* Register Thunk */
export const registerThunk = createAsyncThunk("auth/registerThunk", async (data, thunkApi) => {
  try {
    const responseData = await register(data);
    return responseData.user;

  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "Register failed")
  }
})


/* Register Thunk */
export const loginThunk = createAsyncThunk("auth/loginThunk", async (data, thunkApi) => {
  try {
    const responseData = await login(data);
    // console.log(responseData)

    return responseData.user;

  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "Login failed")
  }
})


/* Logout Thunk */
export const logoutThunk = createAsyncThunk("auth/logoutThunk", async (_, thunkApi) => {
  try {
    const responseData = await logout();
    return responseData.user;

  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "Logout failed")
  }
})


/* Autheticated getMe Thunk */
export const getMeThunk = createAsyncThunk("auth/getMeThunk", async (_, thunkApi) => {
  try {
    const responseData = await getMe();
    return responseData.user;

  } catch (error) {
    return thunkApi.rejectWithValue(error?.responseData?.data?.message || "User authentication failed")
  }
})
