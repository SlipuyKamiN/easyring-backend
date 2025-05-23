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
  await User.findByIdAndUpdate(user._id, { token }, { new: true });

  const currentTime = Date.now();
  const createdAt = user.createdAt.getTime();
  const sinceSignUp = currentTime - createdAt;

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    carNumber: user.carNumber,
    login: user.login,
    role: user.role,
    token,
    sinceSignUp,
  };

  res.json(userData);
};

export default ctrlWrapper(login);
