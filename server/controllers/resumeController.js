import Resume from "../models/Resume.js";
import { extractTextFromPDF } from "../services/resumeParser.js";
import { structureResume } from "../services/resumeStructurer.js";
import { normalizeResume } from "../services/resumeNormalizer.js";
import { analyzeResumeAI } from "../services/aiService.js";
import fs from "fs";
import path from "path";
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
    console.log("========== DELETE REQUEST ==========");
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

    const absolutePath = path.resolve(resume.filePath);

    console.log("RELATIVE PATH:", resume.filePath);
    console.log("ABSOLUTE PATH:", absolutePath);

    try {
      if (fs.existsSync(absolutePath)) {
        console.log("Deleting physical file...");
        fs.unlinkSync(absolutePath);
        console.log("Physical file deleted.");
      } else {
        console.log("File does not exist.");
      }
    } catch (fileError) {
      console.error("FILE DELETE ERROR:", fileError);
    }

    console.log("Deleting MongoDB document...");

    await Resume.findByIdAndDelete(req.params.id);

    console.log("MongoDB document deleted.");

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });

    console.log("Response sent successfully.");
    console.log("========== DELETE COMPLETE ==========");
  } catch (error) {
    console.error("========== DELETE ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      message: error.message,
    });
  }
};