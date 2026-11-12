import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  updateProfile,
} from "../controllers/authController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

// Get logged-in user
router.get("/me", authenticateUser, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      photoURL: req.user.photoURL,
      role: req.user.role,
      status: req.user.status,
      authProvider: req.user.authProvider,
    },
  });
});

// Update logged-in user's profile
router.patch("/profile", authenticateUser, updateProfile);

router.post("/google", googleLogin);

export default router;