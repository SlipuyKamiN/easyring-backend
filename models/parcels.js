import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const parcelSchema = new Schema(
  {
    _id: { type: String, required: true },

    mainInfo: {
      size: { type: String, enum: ["S", "M", "L"], required: true },
      date: { type: Date, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      description: { type: String, required: true },
      distance: { type: String, required: true },
    },

    sender: {
      phone: { type: String, required: true },
      name: { type: String, required: true },
      address: {
        type: {
          type: String,
          required: true,
        },
        properties: { type: Object, default: {} },
        geometry: { type: Object, default: {} },
        bbox: { type: [Number], default: [] },
      },
      email: { type: String, required: true },
      comment: { type: String },
    },

    recipient: {
      phone: { type: String, required: true },
      name: { type: String, required: true },
      address: {
        type: {
          type: String,
          required: true,
        },
        properties: { type: Object, default: {} },
        geometry: { type: Object, default: {} },
        bbox: { type: [Number], default: [] },
      },
      comment: { type: String },
    },

    tracking: {
      history: [
        {
          statusName: { type: String, required: true },
          status: { type: Number, required: true },
          date: { type: Date, required: true },
        },
      ],
    },

    payment: {
      price: { type: Number, required: true },
      type: { type: String, enum: ["cash", "online", null], required: true },
      transactionDetails: { type: Object, required: true },
      isPaid: { type: Boolean, required: true },
    },

    driver: {
      name: { type: String, default: "" },
      id: { type: String, default: "" },
    },
  },
  { versionKey: false, timestamps: true }
);

parcelSchema.pre("findByIdAndUpdate", handleUpdateValidate);

parcelSchema.post("save", handleSaveError);

parcelSchema.post("findByIdAndUpdate", handleSaveError);

const Parcel = model("parcel", parcelSchema);

export default Parcel;
