import { HttpError, ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const getParcelById = async (req, res) => {
  const { id } = req.params;

  const parcelById = await Parcel.findById(id);

  if (!parcelById) {
    throw HttpError(404, "Sorry, there is no parcel with such id");
  }

  res.json(parcelById);
};

export default ctrlWrapper(getParcelById);
