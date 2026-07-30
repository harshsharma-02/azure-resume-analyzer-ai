import Resume from "../models/Resume.js";
import fs from "fs";

import { extractTextFromPDF } from "../services/resumeParser.js";
import { structureResume } from "../services/resumeStructurer.js";
import { normalizeResume } from "../services/resumeNormalizer.js";
import { analyzeResumeAI } from "../services/aiService.js";
import {
  uploadToAzure,
  downloadFromAzure,
  deleteFromAzure,
} from "../services/blobStorage.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Parse resume from temporary upload
    const extractedText = await extractTextFromPDF(req.file.path);

    // Upload PDF to Azure Blob Storage
    const { blobName, blobUrl } = await uploadToAzure(req.file);

    // Structure resume
    const structuredData = structureResume(extractedText);
    const normalizedData = normalizeResume(structuredData);

    // AI analysis
    const aiFeedback = await analyzeResumeAI(normalizedData, extractedText);

    // Save in MongoDB
    const resume = await Resume.create({
      user: req.user.id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      blobName,
      blobUrl,
      fileSize: req.file.size,
      extractedText,
      analysis: {
        ...normalizedData,
        overallScore: aiFeedback.hiringProbability,
      },
      aiFeedback,
    });

    // Delete temporary file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(201).json({
      message: "Resume uploaded and analyzed successfully",
      resume,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume.blobName) {
  return res.status(400).json({
    message: "Resume file not found in Azure Storage.",
  });
}

    // Download PDF from Azure Blob Storage
    const pdfBuffer = await downloadFromAzure(resume.blobName);

    // Extract text from buffer
    const extractedText = await extractTextFromPDF(pdfBuffer);

    const structuredData = structureResume(extractedText);
    const normalizedData = normalizeResume(structuredData);

    const aiFeedback = await analyzeResumeAI(normalizedData, extractedText);

    resume.extractedText = extractedText;

    resume.analysis = {
      ...normalizedData,
      overallScore: aiFeedback.hiringProbability,
    };

    resume.aiFeedback = aiFeedback;

    await resume.save();

    return res.status(200).json({
      message: "Resume analyzed successfully",
      resume,
    });
  } catch (error) {
    console.error("Analyze Resume Error:", error);

    return res.status(500).json({
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

    return res.status(200).json(resumes);
  } catch (error) {
    console.error("Get Resumes Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await deleteFromAzure(resume.blobName);

    await resume.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete Resume Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
