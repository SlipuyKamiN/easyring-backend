import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const updateDriver = async (req, res) => {
  const { id: _id } = req.params;
  const { currentDriver } = req.body;

  const parcel = await Parcel.findById(_id);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel with such id was not found" });
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    _id,
    { driver: currentDriver },
    { new: true }
  );

  res
    .status(200)
    .json({
      success: true,
      data: updatedParcel,
      message: "Parcel driver was updated",
    });
};

export default ctrlWrapper(updateDriver);
