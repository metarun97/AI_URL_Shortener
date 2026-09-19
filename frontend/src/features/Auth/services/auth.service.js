import { api } from "../../../utils/axiosInstance"


/* Register API */
export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", { username, email, password })

    return response.data;

  } catch (error) {

    console.log("Register Error:", error);
  }
}


/* Login API */
export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", { email, password })

    return response.data;

  } catch (error) {

    console.log("Login Error:", error);
  }
}


/* Logout API */
export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout");

    return response.data;

  } catch (error) {

    console.log("Logout Error:", error);
  }
}


/* GetMe API */
export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;

  } catch (error) {

    console.log("GetMe Error:", error);
  }
}
