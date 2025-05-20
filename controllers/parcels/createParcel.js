import { ctrlWrapper, HttpError } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const createParcel = async (req, res) => {
  const result = await Parcel.create(req.body);

  if (!result) HttpError(401, "Something went wrong");

  res.status(201).json(result);
};

export default ctrlWrapper(createParcel);
