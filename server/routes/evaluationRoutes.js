import express from "express";
import {
  evaluateResumeAgainstJob, getATSReports
} from "../controllers/evaluationController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


router.post(
  "/:resumeId/:jobId",
  authMiddleware,
  evaluateResumeAgainstJob
);

router.get(
  "/reports",
  authMiddleware,
  getATSReports
);


export default router;