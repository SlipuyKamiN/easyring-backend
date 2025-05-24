import { ctrlWrapper, HttpError } from "../../utils/index.js";
import User from "../../models/users.js";

const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  const { role } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User with such id was not found");
  }

  if (role !== "admin") {
    throw HttpError(403, "You are not authorized to delete this user");
  }

  const data = await User.findByIdAndDelete(_id);

  res.json({
    success: true,
    data,
    message: `User id: ${data._id} has been deleted`,
  });
};

export default ctrlWrapper(deleteUser);
