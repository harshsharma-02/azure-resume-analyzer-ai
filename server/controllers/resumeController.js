import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../services/resumeParser.js";
import { structureResume } from "../services/resumeStructurer.js";
import { normalizeResume } from "../services/resumeNormalizer.js";
import { analyzeResumeAI } from "../services/aiService.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // 1. Save uploaded resume

    const resume = await Resume.create({
      user: req.user.id,

      originalName: req.file.originalname,

      fileName: req.file.filename,

      filePath: req.file.path,

      fileSize: req.file.size,
    });

    // 2. Extract text

    const extractedText = await extractTextFromPDF(resume.filePath);

    // 3. Structure resume

    const structuredData = structureResume(extractedText);

    // 4. Normalize data

    const normalizedData = normalizeResume(structuredData);

    // 5. Save analysis

    resume.extractedText = extractedText;

    resume.analysis = normalizedData;

    await resume.save();

    res.status(201).json({
      message: "Resume uploaded and analyzed successfully",

      resume,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const extractedText = await extractTextFromPDF(resume.filePath);

    const structuredData = structureResume(extractedText);

    const normalizedData = normalizeResume(structuredData);

    resume.extractedText = extractedText;

    resume.analysis = normalizedData;

    const aiFeedback = await analyzeResumeAI(normalizedData, extractedText);

    resume.aiFeedback = aiFeedback;

    await resume.save();

    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: normalizedData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
