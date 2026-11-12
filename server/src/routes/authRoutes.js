import express from "express";
import { registerUser,loginUser, logoutUser,googleLogin } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)
router.get("/me", authenticateUser, (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
router.post("/google", googleLogin);
export default router;