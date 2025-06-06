import { ctrlWrapper } from "../../utils/index.js";
import User from "../../models/users.js";

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json("Logout success");
};
export default ctrlWrapper(logout);
