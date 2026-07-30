import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../services/resumeParser.js";
import { structureResume } from "../services/resumeStructurer.js";
import { normalizeResume } from "../services/resumeNormalizer.js";
import { analyzeResumeAI } from "../services/aiService.js";
import fs from "fs";
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Create resume document

    const resume = await Resume.create({
      user: req.user.id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
    });

    // Extract text

    const extractedText = await extractTextFromPDF(resume.filePath);

    // Parse & normalize

    const structuredData = structureResume(extractedText);
    const normalizedData = normalizeResume(structuredData);

    // Generate AI feedback

    const aiFeedback = await analyzeResumeAI(
      normalizedData,
      extractedText
    );

    // Save everything

    resume.extractedText = extractedText;

    resume.analysis = {
      ...normalizedData,
      overallScore: aiFeedback.hiringProbability,
    };

    resume.aiFeedback = aiFeedback;

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

    const aiFeedback = await analyzeResumeAI(
      normalizedData,
      extractedText
    );

    resume.extractedText = extractedText;

    resume.analysis = {
      ...normalizedData,
      overallScore: aiFeedback.hiringProbability,
    };

    resume.aiFeedback = aiFeedback;

    await resume.save();

    res.status(200).json({
      message: "Resume analyzed successfully",
      resume,
    });
  } catch (error) {
    console.error("Analyze Resume Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getUserResumes = async (req, res) => {
  try {

    // console.log("USER FROM TOKEN:", req.user);

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(resumes);

  } catch (error) {

    console.error("GET RESUMES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteResume = async (req, res) => {
  try {
    console.log("DELETE ID:", req.params.id);

    const resume = await Resume.findById(req.params.id);

    console.log("FOUND RESUME:", resume);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    console.log("RESUME USER:", resume.user.toString());
    console.log("REQUEST USER:", req.user.id);

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    console.log("FILE PATH:", resume.filePath);

    if (fs.existsSync(resume.filePath)) {
      console.log("Deleting file...");
      fs.unlinkSync(resume.filePath);
    } else {
      console.log("File does not exist");
    }

    await resume.deleteOne();

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};