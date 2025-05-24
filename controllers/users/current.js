import User from "../../models/users.js";
import { ctrlWrapper } from "../../utils/index.js";

const getCurrent = async (req, res) => {
  const data = req.user;

  res.json({
    success: true,
    data,
    message: "Current user data was found",
  });
};

export default ctrlWrapper(getCurrent);
