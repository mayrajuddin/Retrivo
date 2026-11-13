
import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only: Get all users
router.get(
  "/admin",
  authenticateUser,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;
