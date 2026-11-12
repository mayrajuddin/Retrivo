
import express from "express";
import {
  createItem,
  getCategories,
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

export default router;
