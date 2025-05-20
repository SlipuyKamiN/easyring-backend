import { ctrlWrapper } from "../../utils/index.js";
import Setting from "../../models/settings.js";

// updateSettings (for admin)
const updateSettings = async (req, res) => {
  const { id } = req.params;
  const { _id: user } = req.user;

  const recipe = await Setting.findById(id);

  if (!recipe) {
    return res.status(404).json({ error: "Drink with such id is not found" });
  }

  if (!recipe.users) {
    recipe.users = [];
  }

  const isFavorite = recipe.users.includes(user);

  if (isFavorite) {
    await Setting.findByIdAndUpdate(recipe._id, { $pull: { users: user } });
    res.status(200).json({ message: `Removed ${recipe.drink} from favorites` });
  } else {
    await Setting.findByIdAndUpdate(recipe._id, { $push: { users: user } });
    res.status(200).json({ message: `Added ${recipe.drink} to favorites` });
  }
};

export default ctrlWrapper(updateSettings);
