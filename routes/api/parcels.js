import express from "express";
import {
  createParcel,
  deleteParcel,
  getMyParcels,
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
} from "../../middlewares/index.js";

const router = express.Router();

router.post("/", validateBody(schemas.parcelSchema), createParcel);

router.get("/:id", isValidId, getParcelById);

router.use(authenticate);

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
  "/update/payment/:id",
  isValidId,
  validateBody(schemas.updatePaymentSchema),
  updatePayment
);

router.patch(
  "/update/tracking/:id",
  isValidId,
  validateBody(schemas.updateTrackingSchema),
  updateTracking
);

router.get("/", getParcelsByQuery);

router.get("/myParcels/", getMyParcels);

export default router;
