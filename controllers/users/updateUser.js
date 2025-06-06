import { ctrlWrapper } from "../../utils/index.js";
import User from "../../models/users.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const updateUser = async (req, res) => {
  const { id: _id } = req.params;

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: `User with id ${_id} was not found` });
  }

  const updatedBody = req.body;

  if (updatedBody.password) {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    updatedBody.password = hashPassword;
  }

  const data = await User.findByIdAndUpdate(_id, updatedBody, {
    new: true,
  }).select("-password");

  res.status(200).json(data);
};

export default ctrlWrapper(updateUser);
