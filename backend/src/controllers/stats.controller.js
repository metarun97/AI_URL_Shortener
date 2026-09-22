import urlModel from "../models/url.model.js";
import userModel from "../models/user.model.js";


/**
 * @name getAllUsersStats
 * @description get all user stats in the application
 * @access public
   */
export const getAllUsersStats = async (_, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalUrls = await urlModel.countDocuments();

    const urls = await urlModel.find({}, "clicks");

    const totalClicks = urls.reduce((total, url) =>
      total + (url.clicks || 0), 0)

    res.status(200).json({
      message: "Stats fetched successfully",
      totalUsers,
      totalUrls,
      totalClicks
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
}
