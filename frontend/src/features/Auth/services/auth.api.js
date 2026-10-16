import { api } from "../../../utils/axiosInstance"


/* Register API */
export const signUp = async (data) => {
  try {
    const response = await api.post("/api/auth/register", data)

    return response.data;

  } catch (error) {

    throw error;
  }
}


/* Login API */
export const signIn = async (data) => {
  try {
    const response = await api.post("/api/auth/login", data)

    return response.data;

  } catch (error) {

    throw error;
  }
}


/* Logout API */
export const signOut = async () => {
  try {
    const response = await api.post("/api/auth/logout");

    return response.data;

  } catch (error) {

    throw error;
  }
}


/* GetMe API */
export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;

  } catch (error) {

    throw error;
  }
}
