import { HttpError, ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";
import { escapeRegex } from "../../helpers/escapeRegex.js";

const getParcelsByQuery = async (req, res) => {
  const { search, date, driver } = req.query;

  const query = {
    ...(search && { _id: { $regex: escapeRegex(search), $options: "i" } }),
    ...(date && { "mainInfo.date": date }),
    ...(driver && { "driver._id": driver }),
  };

  const totalHits = await Parcel.countDocuments(query);

  const parcels = await Parcel.find(query).sort({
    "mainInfo.startTime": 1,
  });

  if (parcels.length === 0) {
    throw HttpError(404, "No parcels were found");
  }

  res.json({ totalHits, parcels });
};

export default ctrlWrapper(getParcelsByQuery);
