import express from "express";
import {
  addDietPlan,
  getDietPlans,
  updateDietPlan,
  deleteDietPlan
} from "../controllers/dietController.js";

const router = express.Router();

router.post("/add", addDietPlan);

router.get("/all", getDietPlans);

router.put("/update/:id", updateDietPlan);

router.delete("/delete/:id", deleteDietPlan);

export default router;