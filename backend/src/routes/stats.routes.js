import express from "express";
import { getAllUsersStats } from "../controllers/stats.controller.js";


/* Router creted */
const router = express.Router();

/**
 * @route /api/stats/
 * @description get all user stats in the application
 * @access public
   */
router.get("/", getAllUsersStats);


export default router;

