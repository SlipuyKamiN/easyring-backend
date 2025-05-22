import { ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const getMyParcels = async (req, res) => {
  const { _id: driver } = req.user;

  const result = await Parcel.find({ driver: { _id } });

  if (!result || result.length === 0) {
    return res.status(404).json({ error: "No parcels were found" });
  }

  const totalHits = await Parcel.countDocuments({
    driver: { _id: driver._id },
  });

  res.json({ totalHits, result });
};

export default ctrlWrapper(getMyParcels);
