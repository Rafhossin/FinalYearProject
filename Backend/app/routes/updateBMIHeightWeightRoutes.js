import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import updateBMIHeightWeight from "../controllers/updateBMIHeightWeight.js";

const router = express.Router();

router.put("/bmi", verifyUserMiddleware, updateBMIHeightWeight);

export default router;
