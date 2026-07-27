import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateInterview } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/:id", authMiddleware, generateInterview);

export default router;