import { ctrlWrapper, HttpError } from "../../utils/index.js";
import User from "../../models/users.js";

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  const user = await User.findById(id);

  if (!user) {
    throw HttpError(404, "User with such id was not found");
  }

  if (id === _id) {
    throw HttpError(
      404,
      "You can't delete account of yourself. Contact admin."
    );
  }

  if (role !== "admin") {
    throw HttpError(403, "You are not authorized to delete this user");
  }

  const data = await User.findByIdAndDelete(id);

  res.json({
    success: true,
    data,
    message: `User id: ${data._id} has been deleted`,
  });
};

export default ctrlWrapper(deleteUser);
