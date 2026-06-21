// import express from "express";
// import {
//   createPlan,
//   getPlans,
//   getAllPlans
// } from "../controllers/planController.js";

// import { authMiddleware } from "../middlewares/authMiddleware.js";
// import { adminMiddleware } from "../middlewares/adminMiddleware.js";

// const planRouter = express.Router();


// // Create plan
// planRouter.post(
//   "/",
//   authMiddleware,
//   createPlan
// );


// // User's own plans
// planRouter.get(
//   "/plans",
//   authMiddleware,
//   getPlans
// );


// // Admin → All users plans
// planRouter.get(
//   "/all",
//   authMiddleware,
//   adminMiddleware,
//   getAllPlans
// );


// export default planRouter;

import express from "express";
import {
  createPlan,
  getPlans,
  getAllPlans
} from "../controllers/planController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const planRouter = express.Router();


// CREATE PLAN
planRouter.post(
  "/",
  authMiddleware,
  createPlan
);


// USER PLANS
planRouter.get(
  "/plans",
  authMiddleware,
  getPlans
);


// ADMIN ALL PLANS
planRouter.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllPlans
);

export default planRouter;