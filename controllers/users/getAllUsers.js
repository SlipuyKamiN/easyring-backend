import { ctrlWrapper } from "../../utils/index.js";

const getAllUsers = (req, res) => {
  const { _id, email, name, avatarURL, token } = req.user;
  res.json({
    _id,
    email,
    name,
    avatarURL,
    token,
  });
};

export default ctrlWrapper(getAllUsers);
