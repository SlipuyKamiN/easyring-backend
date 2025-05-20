import express from "express";
import {
  createParcel,
  deleteParcel,
  getMyParcels,
  getParcelById,
  getParcelsByQuery,
  updateParcel,
} from "../../controllers/parcels/index.js";
import schemas from "../../schemas/parcelSchema.js";
import {
  validateBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  authenticate,
  validateBody(schemas.parcelSchema),
  createParcel
);

router.delete("/:id", isValidId, authenticate, deleteParcel);

router.patch("/:id", isValidId, updateParcel);

router.get("/:id", isValidId, getParcelById);

router.get("/", getParcelsByQuery);

router.get("/", authenticate, getMyParcels);

export default router;
