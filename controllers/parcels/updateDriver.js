import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";
import User from "../../models/users.js";

const updateDriver = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: driverId } = req.body;

  const parcel = await Parcel.findById(_id);
  const driver = await User.findById(driverId);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel with such id was not found" });
  }

  if (!driver) {
    console.log(driver);

    return res.status(404).json({ error: "Driver with such id was not found" });
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    _id,
    { driver: req.body },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: updatedParcel,
    message: "Parcel driver was updated",
  });
};

export default ctrlWrapper(updateDriver);
