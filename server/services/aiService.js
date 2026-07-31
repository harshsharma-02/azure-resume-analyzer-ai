import client from "../services/aiClient.js";

const MODEL = process.env.GROQ_MODEL;

/**
 * Generic Groq request handler
 */
async function generateAIResponse(prompt) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: MODEL,
        temperature: 0.2,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content:
              "You are an expert ATS recruiter and software engineering hiring manager. Always return ONLY valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = response.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("Empty response received from AI.");
      }

      const result = JSON.parse(content);

      if (!result || typeof result !== "object") {
        throw new Error("Invalid JSON returned by AI.");
      }

      return result;
    } catch (error) {
      console.error(
        `Groq request failed (Attempt ${attempt}/${MAX_RETRIES})`
      );
      console.error(error);

      if (attempt === MAX_RETRIES) {
        throw new Error(error.message || "Groq request failed.");
      }

      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 1000)
      );
    }
  }
}

export const analyzeResumeAI = async (resumeAnalysis, extractedText) => {
  const prompt = `
You are a Senior Technical Recruiter, ATS Expert, and Software Engineering Hiring Manager.

Analyze the following resume carefully.

Parsed Resume Data:

${JSON.stringify(resumeAnalysis, null, 2)}

Original Resume:

${extractedText}

Return ONLY valid JSON in exactly this format:

{
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "improvements": [],
  "skillRatings": [
    {
      "name": "React.js",
      "score": 92
    }
  ],
  "recruiterSummary": "",
  "overallRating": 0,
  "hiringProbability": 0
}

Rules:

1. strengths should contain 4 to 6 points.
2. weaknesses should contain 3 to 5 points.
3. missingSkills should contain only technical skills.
4. improvements should be practical and actionable.
5. overallRating should be between 1 and 10.
6. hiringProbability should be between 0 and 100.
7. skillRatings should include EVERY technical skill detected in the resume.
8. Estimate the score based on evidence in projects, internships, certifications and experience.
9. Use this scale:
   90-100 = Excellent practical experience
   75-89 = Strong working knowledge
   60-74 = Intermediate
   40-59 = Beginner
   Below 40 = Only mentioned with little evidence
10. Do not invent technologies that are not present in the resume.
11. Return ONLY valid JSON.
`;

  const result = await generateAIResponse(prompt);

  if (
    !Array.isArray(result.strengths) ||
    !Array.isArray(result.weaknesses) ||
    !Array.isArray(result.missingSkills) ||
    !Array.isArray(result.improvements) ||
    !Array.isArray(result.skillRatings) ||
    typeof result.recruiterSummary !== "string" ||
    typeof result.overallRating !== "number" ||
    typeof result.hiringProbability !== "number"
  ) {
    throw new Error("AI returned an invalid resume analysis.");
  }

  return result;
};

export const compareResumeWithJob = async (
  resumeAnalysis,
  extractedText,
  jobDescription
) => {
  const prompt = `
You are an ATS and Technical Recruiter.

Compare this resume with the following Job Description.

Parsed Resume:

${JSON.stringify(resumeAnalysis, null, 2)}

Original Resume:

${extractedText}

Job Description:

${jobDescription}

Return ONLY valid JSON in exactly this format:

{
  "matchPercentage": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "recommendations": []
}

Rules:

1. matchPercentage must be between 0 and 100.
2. matchedSkills should only contain skills present in both the resume and the job description.
3. missingSkills should contain only skills required by the job description.
4. recommendations should contain 3 to 5 practical improvements.
5. Return ONLY valid JSON.
`;

  const result = await generateAIResponse(prompt);

  if (
    typeof result.matchPercentage !== "number" ||
    !Array.isArray(result.matchedSkills) ||
    !Array.isArray(result.missingSkills) ||
    !Array.isArray(result.recommendations)
  ) {
    throw new Error("AI returned an invalid job comparison.");
  }

  return result;
};