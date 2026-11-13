
import express from "express";

import {
  createClaim,
  getMyClaims,
  getReporterClaims,
  updateClaimStatus,
} from "../controllers/claimController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createClaim);

router.get("/my-claims", authenticateUser, getMyClaims);

router.get(
  "/reporter-requests",
  authenticateUser,
  getReporterClaims
);

router.patch(
  "/:id/status",
  authenticateUser,
  updateClaimStatus
);

export default router;
