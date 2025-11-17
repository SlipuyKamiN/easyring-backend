import axios from "axios";
import { ctrlWrapper, HttpError } from "../../utils/index.js";

const { GOOGLE_PLACES_API } = process.env;

const getReviews = async (req, res) => {
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

    res.status(200).json(data.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error_message || error.message;
    throw HttpError(status, message);
  }
};

export default ctrlWrapper(getReviews);
