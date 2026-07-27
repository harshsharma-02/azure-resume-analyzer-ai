const skillsList = [
  "Java",
  "Python",
  "JavaScript",
  "React",
  "React.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Azure",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "Machine Learning",
  "Artificial Intelligence",
  "C++",
];


export const analyzeResumeText = (text) => {

  const lowerText = text.toLowerCase();


  const skills = skillsList.filter((skill)=>
    lowerText.includes(skill.toLowerCase())
  );


  const sections={

    personalInfo:{
      name:"",
      email:"",
      phone:""
    },

    skills,

    education:[],

    projects:[],

    experience:[],

    certifications:[]

  };



  // Email

  const emailMatch=text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );


  if(emailMatch){
    sections.personalInfo.email=emailMatch[0];
  }



  // Phone

  const phoneMatch=text.match(
    /(\+91[\s-]?)?[6-9]\d{9}/
  );


  if(phoneMatch){
    sections.personalInfo.phone=phoneMatch[0];
  }



  // Name (first line assumption)

  const lines=text.split("\n")
    .map(line=>line.trim())
    .filter(Boolean);


  if(lines.length>0){
    sections.personalInfo.name=lines[0];
  }




  // Education

  const educationPatterns=[
    "b.tech",
    "bachelor",
    "computer science",
    "engineering",
    "master",
    "m.tech"
  ];


  const educationFound=educationPatterns.filter(keyword=>
    lowerText.includes(keyword)
  );


  if(educationFound.length){

    sections.education.push({

      keywords:educationFound

    });

  }




  // Projects

  const projectIndex=lowerText.indexOf("projects");


  if(projectIndex!==-1){

    sections.projects.push(
      text.substring(
        projectIndex,
        projectIndex+500
      )
    );

  }




  // Certifications

  const certificationKeywords=[
    "azure",
    "az-900",
    "aws certified",
    "certification"
  ];


  const certificationFound=
  certificationKeywords.filter(keyword=>
    lowerText.includes(keyword)
  );


  sections.certifications=certificationFound;



  return sections;

};