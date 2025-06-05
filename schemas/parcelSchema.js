import Joi from "joi";

const parcelSchema = Joi.object({
  _id: Joi.string().optional(),

  mainInfo: Joi.object({
    size: Joi.string().valid("S", "M", "L").required(),
    date: Joi.date().iso().required(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
    description: Joi.string().required(),
    distance: Joi.number().required(),
  }).required(),

  sender: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[0-9]{10,15}$/)
      .required(),
    name: Joi.string().required(),
    address: Joi.object({
      type: Joi.string().required(),
      properties: Joi.object().required(),
      geometry: Joi.object().required(),
      bbox: Joi.array().items(Joi.number()).optional(),
    }).required(),
    email: Joi.string().email().required(),
    comment: Joi.string().allow("").optional(),
  }).required(),

  recipient: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?[0-9]{10,15}$/)
      .required(),
    name: Joi.string().required(),
    address: Joi.object({
      type: Joi.string().required(),
      properties: Joi.object().required(),
      geometry: Joi.object().required(),
      bbox: Joi.array().items(Joi.number()).optional(),
    }).required(),
    comment: Joi.string().allow("").optional(),
  }).required(),

  tracking: Joi.object({
    history: Joi.array()
      .items(
        Joi.object({
          statusName: Joi.string().required(),
          status: Joi.number().required(),
          date: Joi.date().iso().required(),
        })
      )
      .required(),
  }).required(),

  payment: Joi.object({
    price: Joi.number().required(),
    type: Joi.string().valid("cash", "online").allow(null).required(),
    transactionDetails: Joi.object().required(),
    isPaid: Joi.boolean().required(),
  }).required(),

  driver: Joi.object({
    name: Joi.string().allow("").required(),
    _id: Joi.string().allow("").required(),
  }).required(),
});

const updateDriverSchema = Joi.object({
  name: Joi.string().required(),
  _id: Joi.string().required(),
}).required();

const updatePaymentSchema = Joi.object({
  price: Joi.number().optional(),
  type: Joi.string().valid("cash", "online").optional(),
  transactionDetails: Joi.object().optional(),
  isPaid: Joi.boolean().required(),
}).required();

const updateTrackingSchema = Joi.object({
  statusName: Joi.string().required(),
  status: Joi.number().required(),
  date: Joi.date().iso().required(),
}).required();

export default {
  parcelSchema,
  updateDriverSchema,
  updatePaymentSchema,
  updateTrackingSchema,
};
