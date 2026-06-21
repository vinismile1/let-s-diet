import express from "express";
import {
  registerUser,
  loginUser
} from "../controllers/userController.js";
import { getProfile } from "../controllers/userController.js";
import { getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/me", authMiddleware, getCurrentUser);

export default router;