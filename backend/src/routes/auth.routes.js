import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as authValidation from '../middlewares/validation.middleware.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as ratelimiter from '../middlewares/rateLimit.middleware.js';


/* Router created */
const router = express.Router();

/**
 * @route  /api/auth/register
 * @description  for register a new user
 * @access  public
 */
router.post("/register", ratelimiter.registerUserLimiter, authValidation.registerRules, authController.register);


/**
 * @route  /api/auth/login
 * @description for login a user
 * @access public
 */
router.post("/login", ratelimiter.loginUserLimiter, authValidation.loginRules, authController.login);


/**
 * @route  /api/auth/logout
 * @description for logout the current user
 * @access public
 */
router.post("/logout", authController.logout);


/**
 * @route  /api/auth/get-me
 * @description to get the current logged in user
 * @access private
 */
router.get("/get-me", authMiddleware.protectedAuthUser, authController.getMe)

export default router;
