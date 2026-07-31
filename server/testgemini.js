import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const response = await client.models.generateContent({
  model: process.env.GEMINI_MODEL,
  contents: "Reply with exactly: Gemini is working",
});

console.log(response.text);