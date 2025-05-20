import express from "express";
import {
  register,
  login,
  getCurrent,
  logout,
  updateUser,
  getAllUsers,
} from "../../controllers/users/index.js";
import schemas from "../../schemas/userSchema.js";
import { validateBody, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.post("/signup", validateBody(schemas.userSignupSchema), register);

router.post("/signin", validateBody(schemas.userSigninSchema), login);

router.get("/current", authenticate, getCurrent);

router.get("/users", authenticate, getAllUsers);

router.patch("/user", authenticate, updateUser);

router.post("/logout", authenticate, logout);

export default router;
