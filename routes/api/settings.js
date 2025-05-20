import express from "express";
import {
  getSettings,
  updateSettings,
} from "../../controllers/settings/index.js";

import { authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getSettings);

router.patch("/", updateSettings);

export default router;
