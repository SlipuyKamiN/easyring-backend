import { Schema, model } from "mongoose";

import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const parcelSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    mainInfo: {
      size: {
        type: String,
        enum: ["S", "M", "L"],
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
      },
    },
    sender: {
      phone: {
        type: String,
        required: true,
        match: /^\+49\d{10,15}$/,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postcode: { type: String, required: true },
        lat: {
          type: Number,
          required: true,
        },
        lon: {
          type: Number,
          required: true,
        },
      },
      email: {
        type: String,
        match: /.+@.+\..+/,
      },
      comment: {
        type: String,
      },
    },
    recipient: {
      phone: {
        type: String,
        required: true,
        match: /^\+49\d{10,15}$/,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postcode: { type: String, required: true },
        lat: {
          type: Number,
          required: true,
        },
        lon: {
          type: Number,
          required: true,
        },
      },
      comment: {
        type: String,
      },
    },
    tracking: {
      history: [
        {
          status: { type: String, required: true },
          statusCode: { type: String, required: true },
          time: { type: Date, required: true },
        },
      ],
      paymentInfo: {
        price: {
          type: String,
          required: true,
        },
        paymentType: {
          type: String,
          enum: ["cash", "card", "online"],
          required: true,
        },
        isPaid: {
          type: Boolean,
          required: true,
        },
        transactionId: {
          type: String,
          default: null,
        },
        transactionTime: {
          type: Date,
          default: null,
        },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

parcelSchema.pre("findByIdAndUpdate", handleUpdateValidate);

parcelSchema.post("save", handleSaveError);

parcelSchema.post("findByIdAndUpdate", handleSaveError);

const Parcel = model("parcel", parcelSchema);

export default Parcel;
