import { HttpError, ctrlWrapper } from "../../utils/index.js";
import Cocktail from "../../models/parcels.js";

const getParcelById = async (req, res) => {
  const { id } = req.params;

  const drinkById = await Cocktail.findById(id);

  if (!drinkById) {
    throw HttpError(404, "Sorry, there is no drink with such id");
  }

  res.json(drinkById);
};

export default ctrlWrapper(getParcelById);
