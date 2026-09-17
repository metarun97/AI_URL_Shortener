// Imported items:-
import jwt from "jsonwebtoken";
import redisClient from "../db/redis.js";


// authenticationPass for pass the authenticated user:-
export const protectedAuthUser = async (req, res, next) => {
  const token = req?.cookies?.token;

  // If token not found:-
  if (!token) {
    return res.status(404).json({
      message: "Unotherized: token is required",
    })
  }

  /* Check for blackListed token */
  const isBlackListed = await redisClient.get(`blackList:${token}`);

  if (isBlackListed) {
    return res.status(401).json({
      message: "Token has been revoked",
    });
  }

  try {
    /* Verify token and get decoded data and set to req.user */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    /* Proceed to next step */
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unotherized",
    })
  }
}

