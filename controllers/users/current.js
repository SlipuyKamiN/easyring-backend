import { ctrlWrapper } from "../../utils/index.js";

const getCurrent = (req, res) => {
  const { _id, email, login, name, phone, role, token } = req.user;
  res.json({
    _id,
    email,
    login,
    name,
    phone,
    token,
    role,
  });
};

export default ctrlWrapper(getCurrent);
