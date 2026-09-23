import rateLimit from "express-rate-limit";


/* Register API rate limiter */
export const registerUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,     // 1 hour
  limit: 5,                     // 5 Requests
  message: {
    message: "Too many Register user creation requests. Please try again later.",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

/* Login API rate limiter */
export const loginUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,     // 15 minutes
  limit: 5,                     // 5 Requests
  message: {
    message: "Too many Login user creation requests. Please try again later.",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});


/* Create URL API rate limiter */
export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,     // 15 minutes
  limit: 20,                    // 20 Requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many URL creation requests. Please try again later.",
  },
})

/* Get all URLs API rate limiter */
export const getAllUrlsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    limit: 60,                  // 60 Requests
    message: {
        message: "Too many requests. Please try again later."
    },
    standardHeaders: "draft-8",
    legacyHeaders: false
});

