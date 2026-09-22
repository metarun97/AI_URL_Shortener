import express from "express";
import { createShortUrlController, redirectShortUrlController, deleteUrlController, allUrlsConroller } from "../controllers/url.controller.js";
import { protectedAuthUser } from '../middlewares/auth.middleware.js';
import { createShortUrlValidation } from "../middlewares/authValidator.middleware.js";
import { createUrlLimiter } from './../middlewares/rateLimit.middleware.js';


// Router created:-
const router = express.Router();


/**
 * @route  /api/url/create
 * @description  for create a new shortURL
 * @access  private
 */
router.post("/create", protectedAuthUser, createShortUrlValidation, createUrlLimiter, createShortUrlController);


/**
 * @route  /api/url/:shortCode
 * @description  for redirect to the shortUrl
 * @access  public
 */
router.get("/:shortCode", redirectShortUrlController);


/**
 * @routes  /api/url/:id
 * @description  for currentUser to delete the shortUrl
 * @access  private
 */
router.delete("/:id", protectedAuthUser, deleteUrlController);


/**
 * @routes  /api/url/
 * @description  to get all currentUser's  short URLs
 * @access  private
 */
router.get("/", protectedAuthUser, allUrlsConroller);


export default router;

