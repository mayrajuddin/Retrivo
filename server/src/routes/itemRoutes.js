
import express from "express";
import {
  createItem,
  getCategories,
  getMyReports
} from "../controllers/itemController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get all categories
router.get("/categories", getCategories);

// Create item report (Login required)
router.post(
  "/",
  authenticateUser,
  upload.single("item_image"),
  createItem
);
// Get logged-in user's reports
router.get("/my-reports", authenticateUser, getMyReports);
export default router;
