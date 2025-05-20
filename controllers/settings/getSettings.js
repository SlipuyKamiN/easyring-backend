import Setting from "../../models/settings.js";
import { ctrlWrapper } from "../../utils/index.js";

//getSettings (for admin)
const getSettings = async (req, res) => {
  const settings = await Setting.find().sort({ title: 1 });

  if (!settings) {
    throw HttpError(404, "Sorry, there are no settings to display");
  }
  res.json(settings);
};

export default ctrlWrapper(getSettings);
