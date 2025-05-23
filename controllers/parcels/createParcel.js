import { ctrlWrapper, HttpError } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";
import { customAlphabet } from "nanoid";

const createParcel = async (req, res) => {
  const generateParcelId = () => {
    const {
      mainInfo: { size },
    } = req.body;
    const prefix = `M${size === "S" ? "X" : size}`;
    const number = customAlphabet("0123456789", 8);

    return `${prefix}${number()}`;
  };

  const result = await Parcel.create({
    _id: generateParcelId(),
    ...req.body,
  });

  if (!result) HttpError(401, "Something went wrong");

  res.status(201).json(result);
};

export default ctrlWrapper(createParcel);
