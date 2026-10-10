/* Imported items */
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateGravatarUrl from '../utils/gravetar.js';
import redisClient from '../db/redis.js';


/**
 * @name register
 * @description register a new user expects username, email and password in req.body
 * @access public
 */
export const register = async (req, res) => {
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
        message: "User already exists!",
      })

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
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    })

    /*  Final response */
    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },

    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error!",
    });
  }
}


/**
 * @name login
 * @description login a user expects email and password in req.body
 * @access public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Check for user's by email */
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password!",
      })

    }

    /* Check for user's by password */
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password!",
      })
    }

    /* Give token to login user and save in cookie */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000   // 1 day
    })

    /* Final response */
    res.status(200).json({
      message: 'User logged in successfully!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error!",
    });
  }
}


/**
 * @name getMe
 * @description get the current logged in user
 * @access private
 */
export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user?.id);

    /* Check if user */
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      })
    }

    /* If user found then give final response */
    res.status(200).json({
      message: "Current User fetched successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    })

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error!",
    })
  }
}


/**
 * @name logout
 * @description logout the current logged in user
 * @access public
 */
export const logout = async (req, res) => {
  try {
    const token = req.cookies?.token;

    /* Check availablity of token in cookies  */
    if (!token) {
      return res.status(404).json({
        success: true,
        message: "Token not found!",
      });
    }

    const decoded = jwt.decode(token);

    /* Find Remaining time of token */
    const remainingTime = decoded.exp - Math.floor(Date.now() / 1000);

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
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "User logout successfully!",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error!",
    })
  }
}

