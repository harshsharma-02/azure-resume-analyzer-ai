const skillsDatabase = [

    "HTML",
    "CSS",
    "Tailwind",
    "React",
    "JavaScript",

    "C++",
    "C#",
    "Java",
    "Python",

    "Node.js",
    "Express",
    "MongoDB",
    "SQL",

    "Azure",
    "AWS",
    "Docker",
    "Kubernetes",

    "Git",
    "Github",

    "Machine Learning",
    "Artificial Intelligence"

];


export const extractJobSkills = (text)=>{

    const foundSkills = [];


    skillsDatabase.forEach(skill=>{


        let regex;


        // Special handling for symbols like C++
        if(skill.includes("+") || skill.includes("#")){

            regex = new RegExp(
                skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                "i"
            );

        }
        else{

            regex = new RegExp(
                `\\b${skill}\\b`,
                "i"
            );

        }


        if(regex.test(text)){

            foundSkills.push(skill);

        }

    });


    return foundSkills;

};