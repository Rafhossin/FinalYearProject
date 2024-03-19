import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import updateProfile from "../controllers/updateProfileController.js";

const router = express.Router();

router.put("/update-profile", verifyUserMiddleware, updateProfile);

export default router;
