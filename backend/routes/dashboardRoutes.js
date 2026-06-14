import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get(
  "/stats",
  protect,
  adminOnly,
  getDashboardData
);

export default dashboardRoutes;