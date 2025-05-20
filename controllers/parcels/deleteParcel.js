import { ctrlWrapper, HttpError } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const deleteParcel = async (req, res) => {
  const { id } = req.params;
  const { _id: user, role } = req.user;

  const parcel = await Parcel.findById(id);

  if (!parcel) {
    throw HttpError(404, "Parcel with such id was not found");
  }

  if (role !== "admin") {
    throw HttpError(403, "You are not authorized to delete this parcel");
  }

  const deletedParcel = await Parcel.findByIdAndDelete(id);

  res.json({
    deletedParcel,
    message: `Parcel id: ${deletedParcel.id} has been deleted`,
  });
};

export default ctrlWrapper(deleteParcel);
