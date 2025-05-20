import { ctrlWrapper } from "../../utils/index.js";
import User from "../../models/users.js";

const updateUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { ...req.body });

  const updatedUser = await User.findById(_id);

  res.status(200).json({ updatedUser, message: "User was updated" });
};

export default ctrlWrapper(updateUser);
