import bcrypt from "bcryptjs";
import User from "../../models/users.js";
import { ctrlWrapper, HttpError } from "../../utils/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    role: "driver",
  });

  res
    .status(201)
    .json({ success: true, data: newUser, message: "New user was registered" });
};

export default ctrlWrapper(register);
