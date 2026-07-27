const technologies = [
  "React.js",
  "React",
  "Tailwind CSS",
  "HTML5",
  "HTML",
  "CSS3",
  "CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C",
  "SQL",
  "Azure",
  "AWS",
  "Docker",
  "Kubernetes",
  "GitHub",
  "Git",
  "Vercel",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Structures & Algorithms",
  "OOP",
];

const cleanText = (text) => {
  return text
    .replace(/\r/g, "")
    .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, "")
    .trim();
};

const fixBrokenLines = (lines) => {
  const fixed = [];

  for (let i = 0; i < lines.length; i++) {
    let current = lines[i];

    if (current.endsWith("-") && i + 1 < lines.length) {
      current = current.slice(0, -1) + lines[i + 1];

      i++;
    }

    fixed.push(current);
  }

  return fixed;
};

const extractTechnologies = (text) => {
  const found = [];

  technologies.forEach((tech) => {
    const regex = new RegExp(
  tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  "i"
);
    if (regex.test(text)) {
      found.push(tech);
    }
  });

  const normalized = found.map((tech) => {
    const map = {
      "React.js": "React",
      Nodejs: "Node.js",
      Express: "Express.js",
      MongoDb: "MongoDB",
      HTML5: "HTML",
      CSS3: "CSS",
    };

    return map[tech] || tech;
  });

  return [...new Set(normalized)];
};

export const structureResume = (text) => {
  text = cleanText(text);

  let lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  lines = fixBrokenLines(lines);

  const resumeData = {
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },

    skills: {
      technical: [],
      soft: [],
    },

    education: [],

    experience: [],

    projects: [],

    certifications: [],
  };

  // PERSONAL INFO

  resumeData.personalInfo.name = lines[0] || "";

  const email = text.match(/[\w.-]+@[\w.-]+\.\w+/);

  if (email) {
    resumeData.personalInfo.email = email[0];
  }

  const phone = text.match(/\+?\d{10,13}/);

  if (phone) {
    resumeData.personalInfo.phone = phone[0];
  }

  // SKILLS

  const skillsIndex = lines.indexOf("SKILLS");

  if (skillsIndex !== -1) {
    for (let i = skillsIndex + 1; i < lines.length; i++) {
      if (
        ["INTERNSHIP", "EXPERIENCE", "PROJECTS", "CERTIFICATIONS"].includes(
          lines[i],
        )
      ) {
        break;
      }

      const value = lines[i].includes(":") ? lines[i].split(":")[1] : lines[i];

      value.split(",").forEach((skill) => {
        const cleanSkill = skill.trim();

        if (!cleanSkill) return;

        if (
          [
            "Problem Solving",
            "Communication",
            "Leadership",
            "Team Work",
          ].includes(cleanSkill)
        ) {
          resumeData.skills.soft.push(cleanSkill);
        } else {
          resumeData.skills.technical.push(cleanSkill);
        }
      });
    }
  }

  // EDUCATION

  const eduIndex = lines.indexOf("EDUCATION");

  if (eduIndex !== -1) {
    for (let i = eduIndex + 1; i < lines.length; i++) {
      if (["SKILLS", "INTERNSHIP", "PROJECTS"].includes(lines[i])) {
        break;
      }

      resumeData.education.push(lines[i]);
    }
  }

  // EXPERIENCE

  const expIndex = lines.indexOf("INTERNSHIP");

  if (expIndex !== -1) {
    for (let i = expIndex + 1; i < lines.length; i++) {
      if (lines[i] === "PROJECTS") {
        break;
      }

      resumeData.experience.push(lines[i]);
    }
  }

  // PROJECTS

  const projectIndex = lines.indexOf("PROJECTS");

  if (projectIndex !== -1) {
    let currentProject = null;

    for (let i = projectIndex + 1; i < lines.length; i++) {
      if (lines[i] === "CERTIFICATIONS") {
        break;
      }

      const line = lines[i];

      if (!line.startsWith("•")) {
        if (currentProject) {
          currentProject.technologies = extractTechnologies(
            currentProject.title + " " + currentProject.description,
          );

          resumeData.projects.push(currentProject);
        }

        currentProject = {
          title: line.replace(/→.*/g, "").trim(),

          description: "",

          technologies: [],
        };
      } else if (currentProject) {
        currentProject.description += line.replace("•", "").trim() + " ";
      }
    }

    if (currentProject) {
      currentProject.technologies = extractTechnologies(
        currentProject.title + " " + currentProject.description,
      );

      resumeData.projects.push(currentProject);
    }
  }

  // CERTIFICATIONS

  const certIndex = lines.indexOf("CERTIFICATIONS");

  if (certIndex !== -1) {
    for (let i = certIndex + 1; i < lines.length; i++) {
      if (lines[i].includes("EXTRA")) {
        break;
      }

      const cert = lines[i].trim();

      if (cert && !cert.startsWith("--")) {
        resumeData.certifications.push(cert);
      }
    }
  }

  return resumeData;
};
