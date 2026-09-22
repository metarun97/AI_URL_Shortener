import { api } from "../utils/axiosInstance"


/* Get stats for homepage */
export const getStats = async () => {
  try {
    const response = await api.get("/api/stats/");
    return response.data;

  } catch (error) {
    console.log("Error to fetch stats:", error);
  }

}
