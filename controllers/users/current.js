import { ctrlWrapper } from "../../utils/index.js";

const getCurrent = async (req, res) => {
  const data = req.user;

  res.status(200).json(data);
};

export default ctrlWrapper(getCurrent);
