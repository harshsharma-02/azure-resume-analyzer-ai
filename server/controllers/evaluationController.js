import Resume from "../models/Resume.js";
import JobDescription from "../models/JobDescription.js";
import ATSReport from "../models/ATSReport.js";
import { evaluateResume } from "../services/atsEvaluator.js";

export const evaluateResumeAgainstJob = async (req, res) => {
  try {
    const { resumeId, jobId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    const job = await JobDescription.findById(jobId);

    if (!resume || !job) {
      return res.status(404).json({
        message: "Resume or Job not found",
      });
    }

    if (!resume.analysis) {
      return res.status(400).json({
        message: "Resume is not analyzed yet",
      });
    }

    if (!job.requiredSkills || job.requiredSkills.length === 0) {
      return res.status(400).json({
        message: "Job does not have required skills",
      });
    }

    const result = evaluateResume(resume.analysis, job);

    // Save ATS report separately

    const report = await ATSReport.create({
      user: req.user.id,

      resume: resume._id,

      job: job._id,

      score: result.atsScore,

      breakdown: result.breakdown,

      matchedSkills: result.matchedSkills,

      missingSkills: result.missingSkills,

      projectMatches: result.projectMatches,

      recommendations: result.recommendations,
    });

    res.status(201).json({
      message: "ATS evaluation completed",

      reportId: report._id,

      result,
    });
  } catch (error) {
    console.error("ATS Evaluation Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getATSReports = async (req, res) => {
  try {
    const reports = await ATSReport.find({
      user: req.user.id,
    })
      .populate("resume", "originalName")
      .populate("job", "title company")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
