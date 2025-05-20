import { HttpError, ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";

const getParcelsByQuery = async (req, res) => {
  const { search, category, ingredient, page = 1, limit = 8 } = req.query;

  const query = {};
  search && (query.drink = { $regex: search, $options: "i" });
  category && (query.category = category);
  ingredient &&
    (query.ingredients = {
      $elemMatch: { title: ingredient },
    });

  const totalHits = await Parcel.countDocuments(query);
  const pageNumber = parseInt(page);
  const skip = (pageNumber - 1) * limit;

  // const parcel = await Parcel.find(query)
  //   .sort({ createdAt: -1 })
  //   .skip(skip)
  //   .limit(limit);

  const parcels = await Parcel.find();

  if (parcels.length === 0) {
    throw HttpError(404, "No parcels were found");
  }

  res.json({ totalHits, parcels });
};

export default ctrlWrapper(getParcelsByQuery);
