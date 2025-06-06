import { HttpError, ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";
import { escapeRegex } from "../../helpers/escapeRegex.js";

const getParcelById = async (req, res) => {
  const { id: _id } = req.params;

  const parcelById = await Parcel.findById(escapeRegex(_id));

  if (!parcelById) {
    throw HttpError(404, "Sorry, there is no parcel with such id");
  }

  res.status(200).json(parcelById);
};

export default ctrlWrapper(getParcelById);
