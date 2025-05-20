import Joi from "joi";

const parcelSchema = Joi.object({
  id: Joi.string().required(),

  mainInfo: Joi.object({
    size: Joi.string().valid("S", "M", "L").required(),
    date: Joi.date().iso().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
    description: Joi.string().allow(""),
  }).required(),

  sender: Joi.object({
    phone: Joi.string()
      .pattern(/^\+49\d{10,15}$/)
      .required(),
    name: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      postcode: Joi.string().required(),
      lat: Joi.number().required(),
      lon: Joi.number().required(),
    }).required(),
    email: Joi.string().email(),
    comment: Joi.string().allow(""),
  }).required(),

  recipient: Joi.object({
    phone: Joi.string()
      .pattern(/^\+49\d{10,15}$/)
      .required(),
    name: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      postcode: Joi.string().required(),
      lat: Joi.number().required(),
      lon: Joi.number().required(),
    }).required(),
    comment: Joi.string().allow(""),
  }).required(),

  tracking: Joi.object({
    history: Joi.array()
      .items(
        Joi.object({
          status: Joi.string().required(),
          statusCode: Joi.string().required(),
          time: Joi.date().iso().required(),
        })
      )
      .required(),

    paymentInfo: Joi.object({
      price: Joi.string().required(),
      paymentType: Joi.string().valid("cash", "card", "online").required(),
      isPaid: Joi.boolean().required(),
      transactionId: Joi.string().allow(null),
      transactionTime: Joi.date().iso().allow(null),
    }).required(),
  }).required(),
});

export default {
  parcelSchema,
};
