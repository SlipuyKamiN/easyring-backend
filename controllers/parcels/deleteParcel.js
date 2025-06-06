import { ctrlWrapper, HttpError } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const deleteParcel = async (req, res) => {
  const { id: _id } = req.params;
  const { role } = req.user;

  const parcel = await Parcel.findById(_id);

  if (!parcel) {
    throw HttpError(404, "Parcel with such id was not found");
  }

  if (role !== "admin") {
    throw HttpError(403, "You are not authorized to delete this parcel");
  }

  const deletedParcel = await Parcel.findByIdAndDelete(_id);

  res.status(200).json(deletedParcel);
};

export default ctrlWrapper(deleteParcel);
