import express from "express";
import getReviews from "../../controllers/google/getReviews.js";

const router = express.Router();

router.get("/get-reviews/:placeID", getReviews);

export default router;
