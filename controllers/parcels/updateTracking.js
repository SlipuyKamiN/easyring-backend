import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";
import sendEmail from "../../helpers/sendEmail.js";
import { getConfirmationHTML } from "../../helpers/getConfirmationHTML.js";

const updateTracking = async (req, res) => {
  const { id: _id } = req.params;

  const parcel = await Parcel.findById(_id);

  if (!parcel) {
    return res.status(404).json({ error: "Parcel with such id was not found" });
  }

  const updatedParcel = await Parcel.findByIdAndUpdate(
    _id,
    {
      $push: { "tracking.history": req.body },
    },
    { new: true }
  );

  console.log(req);

  if (req.body.status === 200) {
    const data = {
      to: parcel.sender.email,
      subject: `Pick-up confirmation ${parcel._id}`,
    };
    sendEmail({ data, html: getConfirmationHTML({ parcel, lang: "de" }) });
  }

  res.status(200).json({
    success: true,
    data: updatedParcel,
    message: "Parcel tracking history was updated",
  });
};

export default ctrlWrapper(updateTracking);
