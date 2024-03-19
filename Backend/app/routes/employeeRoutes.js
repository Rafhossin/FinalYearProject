import express from "express";
import { checkEmployeeId } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/check-employee-id", checkEmployeeId);

export default router;
