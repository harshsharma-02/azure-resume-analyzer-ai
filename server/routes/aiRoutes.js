import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateAIFeedback, getAIFeedback } from "../controllers/aiController.js";

const router = express.Router();

router.get("/test", (req,res)=>{
    res.json({
        message:"AI route working"
    });
});

router.post(
  "/:resumeId",
  authMiddleware,
  generateAIFeedback
);

router.get(
 "/:resumeId",
 authMiddleware,
 getAIFeedback
);


export default router;