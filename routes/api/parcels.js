import express from "express";
import {
  createParcel,
  deleteParcel,
  getParcelById,
  getParcelsByQuery,
  updateDriver,
  updateParcel,
  updatePayment,
  updateTracking,
} from "../../controllers/parcels/index.js";
import schemas from "../../schemas/parcelSchema.js";
import {
  validateBody,
  isValidId,
  authenticate,
  notifyTracking,
} from "../../middlewares/index.js";

const router = express.Router();

router.post(
  "/",
  validateBody(schemas.parcelSchema),
  notifyTracking,
  createParcel
);

router.get("/:id", isValidId, getParcelById);

router.patch(
  "/update/payment/:id",
  isValidId,
  validateBody(schemas.updatePaymentSchema),
  updatePayment
);

router.use(authenticate);

router.get("/", getParcelsByQuery);

router.delete("/:id", isValidId, deleteParcel);

router.patch(
  "/:id",
  isValidId,
  validateBody(schemas.parcelSchema),
  updateParcel
);

router.patch(
  "/update/driver/:id",
  isValidId,
  validateBody(schemas.updateDriverSchema),
  updateDriver
);

router.patch(
  "/update/tracking/:id",
  isValidId,
  validateBody(schemas.updateTrackingSchema),
  updateTracking
);

export default router;
