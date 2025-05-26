import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const updatePayment = async (req, res) => {
  const { id: _id } = req.params;

  const parcel = await Parcel.findById(_id);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel with such id was not found" });
  }

  const update = {};
  for (const key in req.body) {
    update[`payment.${key}`] = req.body[key];
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    _id,
    { $set: update },
    { new: true }
  );

  await Parcel.findById(_id);

  res.status(200).json({
    success: true,
    data: updatedParcel,
    message: "Parcel payment data was updated",
  });
};

export default ctrlWrapper(updatePayment);
