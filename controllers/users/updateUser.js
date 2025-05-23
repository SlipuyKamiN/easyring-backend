import { ctrlWrapper } from "../../utils/index.js";
import User from "../../models/users.js";

const updateUser = async (req, res) => {
  const { id: _id } = req.params;

  const user = await User.findById(_id);

  if (!user) {
    return res.status(404).json({ error: `User with id ${_id} was not found` });
  }

  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ success: true, data: updatedUser, message: "User was updated" });
};

export default ctrlWrapper(updateUser);
