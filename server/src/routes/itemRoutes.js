
import express from "express";
import {
  createItem,
  getCategories,
  getMyReports,
  getApprovedReports,
  getAllReportsAdmin,
  updateReportApprovalStatus,
  deleteApprovedReport,
  getApprovedPublicItems,
  getItemById,
} from "../controllers/itemController.js";

import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

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

// Admin: Get all submitted reports
router.get(
  "/admin/reports",
  authenticateUser,
  authorizeRoles("admin"),
  getAllReportsAdmin
);

// Admin: Get only approved reports
router.get(
  "/admin/approved-reports",
  authenticateUser,
  authorizeRoles("admin"),
  getApprovedReports
);

// Admin: Approve or reject a report
router.patch(
  "/admin/reports/:id/status",
  authenticateUser,
  authorizeRoles("admin"),
  updateReportApprovalStatus
);

// Admin: Delete an approved report
router.delete(
  "/admin/approved-reports/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteApprovedReport
);

// Get approved public items
router.get("/approved", getApprovedPublicItems);

// Get a single approved and active item
router.get("/:id", getItemById);

export default router;
