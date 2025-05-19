import express from "express";
import {
  getAllParcels,
  getParcelById,
  deleteParcel,
  createParcel,
  updateParcel,
} from "../controllers/parcelsControllers.js";

const parcelsRouter = express.Router();

parcelsRouter.get("/", getAllParcels);

parcelsRouter.get("/:id", getParcelById);

parcelsRouter.delete("/:id", deleteParcel);

parcelsRouter.post("/", createParcel);

parcelsRouter.put("/:id", updateParcel);

export default parcelsRouter;
