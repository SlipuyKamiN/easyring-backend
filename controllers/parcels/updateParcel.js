import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const updateParcel = async (req, res) => {
  const { id } = req.params;

  const parcel = await Parcel.findById(id);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel with such id was not found" });
  }

  await Parcel.findByIdAndUpdate(id, { ...req.body });

  const updatedParcel = await Parcel.findById(id);

  res.status(200).json({ updatedParcel, message: "Parcel updated" });
};

export default ctrlWrapper(updateParcel);
