import axios from "axios";
import { ctrlWrapper, HttpError } from "../../utils/index.js";

const { GOOGLE_PLACES_API } = process.env;

const getSession = async (req, res) => {
  const { placeID } = req.params;

  try {
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeID,
          key: GOOGLE_PLACES_API,
          fields: "rating,reviews",
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    if (error) {
      throw HttpError(400, error.message);
    }

    throw HttpError(500, error.message);
  }
};

export default ctrlWrapper(getSession);
