
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import process from "node:process";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON
app.use(express.json({ limit: "1mb" }));

// Parse cookies
app.use(cookieParser());

// Test API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Retrivo backend is running!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

export default app;
