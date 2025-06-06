import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const updateParcel = async (req, res) => {
  const { id: _id } = req.params;

  const parcel = await Parcel.findById(_id);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel with such id was not found" });
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.status(200).json(updatedParcel);
};

export default ctrlWrapper(updateParcel);
