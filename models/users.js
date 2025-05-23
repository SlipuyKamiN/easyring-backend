import { Schema, model } from "mongoose";
import {
  carNumberRegexp,
  emailRegexp,
  loginRegexp,
  phoneRegexp,
} from "../constants/user-constants.js";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    login: {
      type: String,
      lowercase: true,
      match: loginRegexp,
      unique: true,
      required: [true, "Login is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    token: String,
    role: {
      type: String,
      enum: ["admin", "driver"],
      required: true,
    },
    carNumber: {
      type: String,
      uppercase: true,
      match: carNumberRegexp,
      unique: true,
      required: [true, "Car number is required"],
    },
    phone: {
      type: String,
      required: true,
      required: [true, "Phone number is required"],
      match: phoneRegexp,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findByIdAndUpdate", handleUpdateValidate);

userSchema.post("save", handleSaveError);

userSchema.post("findByIdAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
