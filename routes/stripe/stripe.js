import express from "express";
import { createCheckout, getSession } from "../../controllers/stripe/index.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckout);

router.get("/get-session/:id", getSession);

export default router;
