import express from "express";
import * as urlController from "../controllers/url.controller.js";
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as urlValidation from "../middlewares/validation.middleware.js";
import * as rateLimiter from '../middlewares/rateLimit.middleware.js';


// Router created:-
const router = express.Router();


/**
 * @route  /api/url/create
 * @description  for create a new shortURL
 * @access  private
 */
router.post("/create", rateLimiter.createUrlLimiter, authMiddleware.protectedAuthUser, urlValidation.createUrlRules, urlController.createShortUrl);


/**
 * @route  /api/url/:shortCode
 * @description  for redirect to the shortUrl
 * @access  public
 */
router.get("/:shortCode", urlController.redirectShortUrl);


/**
 * @routes  /api/url/:id
 * @description  for currentUser to delete the shortUrl
 * @access  private
 */
router.delete("/:id", authMiddleware.protectedAuthUser, urlController.deleteUrl);


/**
 * @routes  /api/url/
 * @description  to get all currentUser's  short URLs
 * @access  private
 */
router.get("/", rateLimiter.getAllUrlsLimiter, authMiddleware.protectedAuthUser, urlController.meUserUrls);


export default router;

