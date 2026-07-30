import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import { compareResumeJob } from "../controllers/jobMatchController.js";

import {
  uploadResume,
  analyzeResume,
  getUserResumes,
  deleteResume
} from "../controllers/resumeController.js";

const router = express.Router();


router.post("/:id/job-match", authMiddleware, compareResumeJob);
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.post("/analyze/:id", authMiddleware, analyzeResume);
router.delete("/:id", authMiddleware, deleteResume);

router.get("/", authMiddleware, getUserResumes);

export default router;
