import axios from "axios";

/* Axios instance to reduce duplicay */
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})
