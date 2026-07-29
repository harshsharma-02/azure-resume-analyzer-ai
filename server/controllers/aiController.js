import Resume from "../models/Resume.js";
import { analyzeResumeAI } from "../services/aiService.js";

export const generateAIFeedback = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (!resume.extractedText) {
      return res.status(400).json({
        message: "Resume text not available",
      });
    }

    const aiFeedback = await analyzeResumeAI(resume.extractedText);

    resume.aiFeedback = aiFeedback;

    // Save an overall resume score
    resume.analysis = {
      ...resume.analysis,
      overallScore: Math.round(aiFeedback.overallRating * 10),
    };

    await resume.save();

    res.status(200).json({
      message: "AI feedback generated successfully",

      aiFeedback,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAIFeedback = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (!resume.aiFeedback) {
      return res.status(404).json({
        message: "AI feedback not generated yet",
      });
    }

    res.status(200).json({
      aiFeedback: resume.aiFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
