import { Schema, model } from "mongoose";

//settingsSchema
const settingsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredientThumb: {
    type: String,
    required: true,
  },
  "thumb-medium": {
    type: String,
    required: true,
  },
  "thumb-small": {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
});

const Setting = model("setting", settingsSchema);

export default Setting;
