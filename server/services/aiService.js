import client from "../services/aiClient.js"

export const analyzeResumeAI = async (resumeAnalysis, extractedText) => {
  try {
  const prompt = `
You are a Senior Technical Recruiter, ATS Expert, and Software Engineering Hiring Manager.

Analyze the following resume carefully.

Parsed Resume Data:

${JSON.stringify(resumeAnalysis, null, 2)}

Original Resume:

${extractedText}

Return ONLY valid JSON in exactly this format:

{
  "strengths": [
    "string"
  ],
  "weaknesses": [
    "string"
  ],
  "missingSkills": [
    "string"
  ],
  "improvements": [
    "string"
  ],
  "skillRatings": [
    {
      "name": "React.js",
      "score": 92
    }
  ],
  "recruiterSummary": "string",
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
8. Estimate the score based on evidence in projects, internship, certifications and experience.
9. Use this scale:
   90-100 = Excellent practical experience
   75-89 = Strong working knowledge
   60-74 = Intermediate
   40-59 = Beginner
   Below 40 = Only mentioned with little evidence
10. Do not invent technologies that are not present in the resume.
11. Return ONLY valid JSON.
`;

    const response = await client.chat.completions.create({
      model: process.env.GITHUB_MODEL,
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS recruiter. Always return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log(response.choices[0].message.content);
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    throw error;
  }
};

export const compareResumeWithJob = async (
  resumeAnalysis,
  extractedText,
  jobDescription
) => {
  try {
    const prompt = `
You are an ATS and Technical Recruiter.

Compare this resume with the job description.

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
1. matchPercentage should be between 0 and 100.
2. matchedSkills should only contain skills present in both resume and JD.
3. missingSkills should contain skills required by the JD but missing from the resume.
4. recommendations should contain 3 to 5 practical improvements.
`;

    const response = await client.chat.completions.create({
      model: process.env.GITHUB_MODEL,
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You are an ATS recruiter. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Job Match Error:", error.response?.data || error.message);
    throw error;
  }
};
