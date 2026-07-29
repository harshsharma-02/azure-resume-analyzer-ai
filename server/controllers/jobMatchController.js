import Resume from "../models/Resume.js";
import { compareResumeWithJob } from "../services/aiService.js";

export const compareResumeJob = async (req, res) => {
  try {
    console.log("Job Match Controller Hit");
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

    const result = await compareResumeWithJob(
      resume.analysis,
      resume.extractedText,
      jobDescription,
    );

    resume.jobMatch = result;

    await resume.save();

    // console.log(result);

    res.status(200).json({
      message: "Resume compared successfully",

      jobMatch: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
