import client from "./aiClient.js";

export const generateInterviewQuestions = async (
  resumeAnalysis,
  extractedText,
  jobDescription,
) => {
  try {
    const prompt = `
You are a Senior Microsoft Software Engineer and Technical Interviewer.

Generate interview questions based on:

Resume Analysis:

${JSON.stringify(resumeAnalysis, null, 2)}

Original Resume:

${extractedText}

Job Description:

${jobDescription}

Return ONLY valid JSON.

{
  "technical":[
    {
      "question":"",
      "difficulty":"Easy"
    }
  ],

  "projects":[
    {
      "question":"",
      "difficulty":"Medium"
    }
  ],

  "behavioral":[
    {
      "question":"",
      "difficulty":"Medium"
    }
  ],

  "cloud":[
    {
      "question":"",
      "difficulty":"Hard"
    }
  ]
}

Rules:

1. Generate exactly:
   • 8 Technical
   • 5 Project
   • 5 Behavioral
   • 5 Cloud/Azure

2. Questions MUST be based on BOTH the resume and job description.

3. Do NOT ask generic questions.

4. If React exists, ask React.

5. If Node exists, ask Node.

6. If MongoDB exists, ask MongoDB.

7. If Azure exists in the JD, ask Azure deployment questions.

8. If projects exist, ask architecture questions.

9. Difficulty must be Easy, Medium or Hard.

10. Return ONLY JSON.
`;

    const response = await client.chat.completions.create({
      model: process.env.GITHUB_MODEL,
      temperature: 0.3,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: "You are an expert technical interviewer. Return JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
