import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/authSlice';
import urlReducer from'../features/URL/urlSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    url: urlReducer,
  }
})
