import jwt from "jsonwebtoken";
import "dotenv/config";
import { HttpError, ctrlWrapper } from "../../utils/index.js";
import Parcel from "../../models/parcels.js";
import User from "../../models/users.js";
import { escapeRegex } from "../../helpers/escapeRegex.js";

const { JWT_SECRET } = process.env;

const getParcelById = async (req, res) => {
  const { id: _id } = req.params;
  const { authorization = "" } = req.headers;
  let userVerified = false;

  if (authorization) {
    const [bearer, token] = authorization.split(" ");
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    userVerified = user && user?.role && bearer === "Bearer";
  }

  const parcelById = await Parcel.findById(escapeRegex(_id)).select(
    !userVerified ? "-sender -recipient -payment.transactionDetails" : ""
  );

  if (!parcelById) {
    throw HttpError(404, "Sorry, there is no parcel with such id");
  }

  res.status(200).json(parcelById);
};

export default ctrlWrapper(getParcelById);
