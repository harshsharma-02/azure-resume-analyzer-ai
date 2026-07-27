import Resume from "../models/Resume.js";
import { generateInterviewQuestions } from "../services/interviewService.js";

export const generateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobDescription } = req.body;

    const resume = await Resume.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const questions = await generateInterviewQuestions(
      resume.analysis,
      resume.extractedText,
      jobDescription
    );

    resume.interviewQuestions = questions;

    await resume.save();

    res.status(200).json({
      message: "Interview questions generated successfully",
      questions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};