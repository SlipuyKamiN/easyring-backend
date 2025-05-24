import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../../models/users.js";
import { HttpError, ctrlWrapper } from "../../utils/index.js";

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });
  if (!user) {
    throw HttpError(401, "Login or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Login or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  //{ expiresIn: "23h" }

  const token = jwt.sign(payload, JWT_SECRET);
  const data = await User.findByIdAndUpdate(user._id, { token }, { new: true });

  res.json({ success: true, data, message: "Sign in success" });
};

export default ctrlWrapper(login);
