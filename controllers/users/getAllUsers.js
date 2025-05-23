import User from "../../models/users.js";
import { ctrlWrapper } from "../../utils/index.js";

const getAllUsers = async (req, res) => {
  const totalHits = await User.countDocuments();

  const users = await User.find().sort({
    createdAt: 1,
  });

  if (users.length === 0) {
    throw HttpError(404, "No users were found");
  }

  res.json({ totalHits, users });
};

export default ctrlWrapper(getAllUsers);
