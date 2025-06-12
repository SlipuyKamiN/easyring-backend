import express from "express";
import getReviews from "../../controllers/google/getReviews";

const router = express.Router();

router.get("/get-reviews/:placeID", getReviews);

export default router;
