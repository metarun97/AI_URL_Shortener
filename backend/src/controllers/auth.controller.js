/* Imported items */
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateGravatarUrl from '../utils/gravetar.js';
import redisClient from '../db/redis.js';


/**
 * @name registerController
 * @description register a new user axpects username, email and password in req.body
 * @access public
 */
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    /* Check if user already exists */
    const existingUser = await userModel.findOne({
      $or: [
        { username },
        { email }
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists'
      });
    }
    // Make password hash:-
    const hash = await bcrypt.hash(password, 10);

    // gravatar created:-
    const gravatarCreated = generateGravatarUrl(email)

    // Create a new user for regsiter:-
    const user = await userModel.create({
      username,
      email,
      password: hash,
      avatar: gravatarCreated,
    });

    /* Give token to registered user and save in cookie */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    })

    /*  Final response */
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      message: "User is unable to Register"
    });
  }
}

/**
 * @name loginController
 * @description login a user axpects email and password in req.body
 * @access public
 */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Check for user's by email */
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: 'Invalid Email: User not found',
      });
    }

    /* Check for user's by password */
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credential: Password not matched'
      });
    }

    /* Give token to login user and save in cookie */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000   // 1 day
    })

    /* Final response */
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: "User unable to Login",
    });
  }
}

/**
 * @name getMeController
 * @description get the current logged in user
 * @access private
 */
export const getMeController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user?.id);

    /* Check for user if not found */
    if (!user) {
      return res.status(404).json({
        message: "Unotherized: User not found",
      })
    }

    /* If user found then give final response */
    res.status(200).json({
      message: "Current User fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    })

  } catch (error) {
    console.error('CurrentUser error:', error);
    res.status(500).json({
      message: "Unable to fetch currentUser",
    })
  }
}

/**
 * @name logoutController
 * @description logout the current logged in user
 * @access public
 */
export const logoutController = async (req, res) => {
  try {
    const token = req.cookies?.token;
    const decoded = jwt.decode(token);

    /* Check availablity of token in cookies  */
    if (!token) {
      return res.status(401).json({
        success: true,
        message: "token not fond",
      });
    }

    /* Find Remaining time of token */
    const remainingTime = decoded.exp - Math.floor(Date.now / 1000);

    /* Blacklist the token by Redis */
    if (remainingTime > 0) {
      await redisClient.set(
        `blackList:${token}`,
        "true",
        {
          EX: remainingTime,
        }
      )
    }

    /* Clear token from the HTTP cookies */
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logout successfully",
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      message: "User Unable to logout ",
    })
  }
}

