import express from 'express';
import { registerController, loginController, getMeController, logoutController } from '../controllers/auth.controller.js';
import { loginUserValidation, registerUserValidation } from '../middlewares/authValidator.middleware.js';
import { protectedAuthUser } from '../middlewares/auth.middleware.js';
import { loginUserLimiter, registerUserLimiter } from '../middlewares/rateLimit.middleware.js';


/* Router created */
const router = express.Router();

/**
 * @routes  /api/auth/register
 * @description  for register a new user
 * @access  public
 */
router.post("/register", registerUserValidation, registerUserLimiter, registerController);


/**
 * @routes  /api/auth/login
 * @description for login a user
 * @access public
 */
router.post("/login", loginUserValidation, loginUserLimiter, loginController);


/**
 * @routes  /api/auth/logout
 * @description for logout the current user
 * @access public
 */
router.post("/logout", logoutController);


/**
 * @routes  /api/auth/get-me
 * @description for get the current logged in user details
 * @access private
 */
router.get("/get-me", protectedAuthUser, getMeController)

export default router;
