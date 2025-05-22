import { isValidObjectId } from "mongoose";

import { HttpError } from "../utils/index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const customRegEx = /^(MM|MX|ML)\d{8}$/;

  const isObjectId = isValidObjectId(id);
  const isCustomId = customRegEx.test(id);

  if (!isObjectId && !isCustomId) {
    return next(HttpError(404, `${id} is not valid id`));
  }

  next();
};

export default isValidId;
