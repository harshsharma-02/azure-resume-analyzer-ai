
import {
  Award,
  FileText,
  Briefcase,
  Brain,
} from "lucide-react";

import StatsCard from "./StatsCard";


function StatsSection({ resumes }) {

  const latestResume = resumes?.[0];


  const skillsCount =
    latestResume?.analysis?.skills?.technical?.length +
    latestResume?.analysis?.skills?.soft?.length || 0;


  const stats = [

    {
      title:"ATS Score",
      value:
        latestResume?.analysis?.atsScore
          ? `${latestResume.analysis.atsScore}%`
          : "N/A",
      change:"Latest Result",
      icon:Award,
      color:"bg-blue-600"
    },


    {
      title:"Reports",
      value: resumes?.length || 0,
      change:"Uploaded",
      icon:FileText,
      color:"bg-emerald-600"
    },


    {
      title:"Job Matches",
      value:"0",
      change:"Coming Soon",
      icon:Briefcase,
      color:"bg-violet-600"
    },


    {
      title:"Skills",
      value:skillsCount,
      change:"Detected",
      icon:Brain,
      color:"bg-cyan-600"
    }

  ];


return(

<div
className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-4
"
>

{
stats.map(stat=>(

<StatsCard

key={stat.title}

{...stat}

/>

))

}

</div>

)

}

export default StatsSection;