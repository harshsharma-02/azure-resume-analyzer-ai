import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import path from "path";
import jobRoutes from "./routes/jobRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import router from "./routes/interviewRoutes.js";

dotenv.config();
connectDB();
=======

dotenv.config();
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b

const app = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/evaluate", evaluationRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", router);

app.get("/", (req, res) => {
  res.json({
    status: "Azure resume analyzer API running",
=======

app.get("/health", (req, res) => {
  res.json({
    status: "Server Running Successfully",
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> 3921805a54f0f98b13b22c6133d33a482310d10b
