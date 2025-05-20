import { ctrlWrapper } from "../../utils/index.js";

const getCurrent = (req, res) => {
  const { _id, email, name, role, token } = req.user;
  res.json({
    _id,
    email,
    name,
    token,
    role,
  });
};

export default ctrlWrapper(getCurrent);
