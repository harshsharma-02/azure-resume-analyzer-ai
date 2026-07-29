import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* - Security - */

app.use(helmet());

app.use(compression());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: {
      message: "Too many requests. Please try again later.",
    },
  })
);

/* - CORS - */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* - Body Parser - */

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

/* - Static - */

app.use("/uploads", express.static("uploads"));

/* - Routes - */

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/evaluate", evaluationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/interview", interviewRoutes);

/* - Health -*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HireSense AI Backend Running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/* - 404 - */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* - Error Handler - */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// - Start -

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});