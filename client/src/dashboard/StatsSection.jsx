import { Award, FileText, Briefcase, Brain } from "lucide-react";
import StatsCard from "./StatsCard";

function StatsSection({ resumes }) {
  const latestResume = resumes?.[0];
  const skillsCount =
    (latestResume?.analysis?.skills?.technical?.length || 0) +
    (latestResume?.analysis?.skills?.soft?.length || 0);

  const stats = [
    { title: "ATS Score", value: latestResume?.analysis?.atsScore ? `${latestResume.analysis.atsScore}%` : "—", change: "Latest result", icon: Award, accent: "#7ea8ff" },
    { title: "Reports", value: resumes?.length || 0, change: "Total uploaded", icon: FileText, accent: "#67e8f9" },
    { title: "Job Matches", value: "0", change: "Coming soon", icon: Briefcase, accent: "#a78bfa" },
    { title: "Skills", value: skillsCount, change: "Detected", icon: Brain, accent: "#34d399" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
    </div>
  );
}
export default StatsSection;
