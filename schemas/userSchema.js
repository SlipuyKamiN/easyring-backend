import Joi from "joi";
import {
  carNumberRegexp,
  emailRegexp,
  loginRegexp,
  passwordRegexp,
  phoneRegexp,
} from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  login: Joi.string().pattern(loginRegexp).min(3).max(30).required().messages({
    "string.pattern.base":
      "Login should be your surname and first letter of name e.g.[surname.n] in lowercase",
  }),

  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base":
      "Phone must be a valid German mobile number in international format (+49...)",
  }),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot be longer than 16 characters",
      "string.pattern.base":
        "Password must include at least 1 uppercase, 1 lowercase and 1 digit",
      "any.required": "Password is required",
    }),

  carNumber: Joi.string().pattern(carNumberRegexp).required().messages({
    "string.pattern.base":
      "Car number must be a valid German license plate (e.g. MCE4007E)",
  }),

  role: Joi.string().valid("admin", "driver").optional(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().min(6).max(16).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password cannot be longer than 16 characters",
    "any.required": "Password is required",
  }),
  login: Joi.string().pattern(loginRegexp).min(3).max(30).required().messages({
    "string.pattern.base":
      "Login should be your surname and first letter of name e.g.[surname.n] in lowercase",
  }),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  login: Joi.string()
    .pattern(/^[a-z]+\.[a-z]{1,2}$/)
    .min(3)
    .max(30)
    .required(),

  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base":
      "Phone must be a valid German mobile number in international format (+49...)",
  }),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot be longer than 16 characters",
      "string.pattern.base":
        "Password must include at least 1 uppercase, 1 lowercase and 1 digit",
      "any.required": "Password is required",
    }),

  carNumber: Joi.string().pattern(carNumberRegexp).required().messages({
    "string.pattern.base":
      "Car number must be a valid German license plate (e.g. MCE4007E)",
  }),

  role: Joi.string().valid("admin", "driver").required(),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
  updateUserSchema,
};
