import express from "express";
import { createPlan, getPlans } from "../controllers/planController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPlan);
router.get("/my", authMiddleware, getPlans);

export default router;