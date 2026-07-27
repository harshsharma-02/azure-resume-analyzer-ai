import dotenv from "dotenv";
dotenv.config();

import { analyzeResumeAI } from "./services/aiService.js";

const resume = `
HARSH DEV SHARMA

React
Node.js
MongoDB

Built a full stack password manager using MERN.
Completed Microsoft AZ-900 certification.
`;

try {
  const result = await analyzeResumeAI(resume);

  console.log(result);
} catch (err) {
  console.error(err);
}