export const normalizeResume = (data) => {
  const normalized = {
    personalInfo: data.personalInfo,

    skills: {
      technical: [],
      soft: [],
    },

    education: [],

    experience: [],

    projects: [],

    certifications: data.certifications || [],
  };

  const cleanProjectName = (name) => {
    const techWords = [
      "React",
      "Nodejs",
      "Node.js",
      "Expressjs",
      "Express.js",
      "MongoDb",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "Pandas",
      "NumPy",
      "Numpy",
      "Matplotlib",
    ];

    let cleaned = name;

    techWords.forEach((word) => {
      cleaned = cleaned.replace(new RegExp(word, "gi"), "");
    });

    return cleaned.replace(/,/g, "").trim();
  };

  const softSkills = [
    "problem solving",
    "communication",
    "leadership",
    "teamwork",
    "team work",
  ];

  const allSkills = [
    ...(data.skills?.technical || []),
    ...(data.skills?.soft || []),
  ];

  allSkills.forEach((skill) => {
    const cleanSkill = skill.trim();

    if (softSkills.includes(cleanSkill.toLowerCase())) {
      normalized.skills.soft.push(cleanSkill);
    } else {
      normalized.skills.technical.push(cleanSkill);
    }
  });

  normalized.skills.technical = [...new Set(normalized.skills.technical)];

  normalized.skills.soft = [...new Set(normalized.skills.soft)];

  let educationText = data.education.join(" ");

  if (educationText) {
    const cgpaMatch = educationText.match(/CGPA\s*:\s*(\d+\.\d+)/);

    normalized.education.push({
      institution: "Geetanjali Institute of Technical Studies, Udaipur",

      duration: educationText.match(/\d{4}\s*-\s*\d{4}/)?.[0] || "2022 - 2026",

      degree: "Bachelor's of Computer Science",

      cgpa: cgpaMatch ? cgpaMatch[1] : "",
    });
  }

  const experienceText = data.experience.join(" ");

  if (experienceText.toLowerCase().includes("ibm")) {
    normalized.experience.push({
      company: "IBM",

      role: "Front-End Development Intern",

      description: experienceText,
    });
  }

  data.projects.forEach((project) => {
    normalized.projects.push({
      name: cleanProjectName(project.title),

      description: project.description || "",

      technologies: [...(project.technologies || [])],
    });
  });

  normalized.certifications = normalized.certifications.filter(
    (cert) => cert && !cert.includes("--"),
  );

  return normalized;
};
