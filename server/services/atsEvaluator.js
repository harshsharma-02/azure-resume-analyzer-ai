const normalizeSkill = (skill) => {
  let normalized = skill
    .toLowerCase()
    .trim()
    .replace(/[.\s_-]/g, "");

  const aliases = {
    reactjs: "react",

    "react.js": "react",

    nodejs: "node",

    "node.js": "node",

    expressjs: "express",

    "express.js": "express",

    mongodb: "mongodb",

    mongodb: "mongodb",

    tailwindcss: "tailwind",

    html5: "html",

    css3: "css",
  };

  return aliases[skill.toLowerCase().trim()] || normalized;
};

export const evaluateResume = (resumeAnalysis, jobData) => {
  const resumeSkills = resumeAnalysis.skills.technical.map(normalizeSkill);

  const requiredSkills = jobData.requiredSkills.map(normalizeSkill);

  const matchedSkills = requiredSkills.filter((skill) =>
    resumeSkills.includes(skill),
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !resumeSkills.includes(skill),
  );

  const skillScore = (matchedSkills.length / requiredSkills.length) * 50;

  // PROJECT MATCHING

  let projectScore = 0;

  const projectMatches = [];

  resumeAnalysis.projects.forEach((project) => {
    const projectContent = (
      project.name +
      " " +
      project.description +
      " " +
      (project.technologies || []).join(" ")
    ).toLowerCase();

    requiredSkills.forEach((skill) => {
      if (projectContent.includes(skill)) {
        projectMatches.push(`${project.name} uses ${skill}`);

        projectScore += 5;
      }
    });
  });

  projectScore = Math.min(projectScore, 20);
  // EXPERIENCE

  let experienceScore = 0;

  if (resumeAnalysis.experience && resumeAnalysis.experience.length > 0) {
    experienceScore = 15;
  }

  // CERTIFICATIONS

  let certificationScore = 0;

  if (
    resumeAnalysis.certifications &&
    resumeAnalysis.certifications.length > 0
  ) {
    certificationScore = 10;
  }

  const finalScore = Math.round(
    skillScore + projectScore + experienceScore + certificationScore,
  );

  return {
    atsScore: finalScore,

    breakdown: {
      skills: Math.round(skillScore),

      projects: projectScore,

      experience: experienceScore,

      certifications: certificationScore,
    },

    matchedSkills,

    missingSkills,

    projectMatches,

    recommendations: generateRecommendations(missingSkills),
  };
};

const generateRecommendations = (skills) => {
  return skills.map(
    (skill) => `Consider adding ${skill} experience or projects`,
  );
};
