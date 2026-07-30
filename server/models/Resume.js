import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    extractedText: {
      type: String,
    },
    analysis: {
      type: Object,
    },
    aiFeedback: {
      type: Object,
    },
    jobMatch: {
      matchPercentage: {
        type: Number,
      },

      matchedSkills: [String],

      missingSkills: [String],

      recommendations: [String],
    },
    interviewQuestions: {
      type: Object,
      default: {},
    },
    blobName: {
      type: String,
    },

    blobUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Resume", resumeSchema);
