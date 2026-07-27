import JobDescription from "../models/JobDescription.js";
import { extractJobSkills } from "../services/jobSkillExtractor.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const requiredSkills = extractJobSkills(description);

    const job = await JobDescription.create({
      title,

      company,

      description,

      requiredSkills,
    });

    res.status(201).json({
      message: "Job created successfully",

      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await JobDescription.find();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
