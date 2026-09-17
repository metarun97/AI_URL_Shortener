import { body, validationResult } from "express-validator";

/* Validation error arrays respond */
const respondWithVelidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  next();
}

/* Register validation rules */
export const registerUserValidation = [
  body("username")
    .isString()
    .withMessage("username must be string")
    .notEmpty()
    .withMessage("username must be required")
    .isLength({ min: 3 })
    .withMessage("name must be atleast 3 charachter long"),
  body("email")
    .notEmpty()
    .withMessage("email must be required")
    .isString()
    .withMessage("Invalid email address")
    .withMessage("email must be string"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 or more charachter long"),
  body("avatar")
    .optional()
    .isString()
    .withMessage("avatar must be a string"),

  respondWithVelidationErrors
]

/*  Login validation rules */
export const loginUserValidation = [

  body("email")
    .notEmpty()
    .withMessage("email must be required")
    .isString()
    .withMessage("Invalid email credential"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Invalid password credential"),
  respondWithVelidationErrors
]

/* create URL validation rules */
export const createShortUrlValidation = [
  body("originalUrl")
    .trim()
    .notEmpty()
    .withMessage("Original URL is required")
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("Please enter a valid URL (http:// or https://)"),

  body("shortCode")
    .optional()
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Short code must be between 4 and 20 characters")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Short code can only contain letters, numbers, hyphens (-), and underscores (_)"
    ),
];
