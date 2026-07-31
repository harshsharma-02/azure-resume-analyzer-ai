import {
  FileText,
  Target,
  Trophy,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

function QuickActions({ resume }) {
  const extractedText = resume?.extractedText || "";

  const wordCount = extractedText
    ? extractedText.trim().split(/\s+/).length
    : 0;

  const readTime = Math.max(1, Math.ceil(wordCount / 220));

  const technicalSkills =
    resume?.analysis?.skills?.technical || [];

  const certifications =
    resume?.analysis?.certifications || [];

  const projects =
    resume?.analysis?.projects || [];

  const ats =
    resume?.jobMatch?.matchPercentage ??
    ((resume?.aiFeedback?.overallRating || 0) * 10);

  const atsStatus =
    ats >= 90
      ? "Excellent"
      : ats >= 75
      ? "Strong"
      : ats >= 60
      ? "Average"
      : "Needs Work";

  const wordStatus =
    wordCount > 1000
      ? "Too Long"
      : wordCount >= 700
      ? "Ideal"
      : wordCount >= 300
      ? "Good"
      : "Too Short";

  let level = "Beginner";

  if (
    technicalSkills.length >= 10 &&
    projects.length >= 3 &&
    certifications.length >= 1
  ) {
    level = "Advanced";
  } else if (
    technicalSkills.length >= 6 &&
    projects.length >= 2
  ) {
    level = "Intermediate";
  }

  const insights = [
    {
      icon: FileText,
      title: "Resume Length",
      value: `${wordCount} Words`,
      status: wordStatus,
    },
    {
      icon: Target,
      title: "ATS Readiness",
      value: `${ats}%`,
      status: atsStatus,
    },
    {
      icon: Trophy,
      title: "Resume Level",
      value: level,
      status: `${projects.length} Projects`,
    },
    {
      icon: Clock,
      title: "Read Time",
      value: `${readTime} min`,
      status: "Recruiter View",
    },
  ];

  return (
    <div className="glass p-3 hover-lift">
      <div className="eyebrow">
        Live Metrics
      </div>

      <h2 className="mt-2 text-center font-display text-2xl text-white">
        AI Resume Insights
      </h2>

      <p className="mt-2 text-center text-sm text-[#94a3b8]">
        Generated from your latest resume analysis
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 hover:border-[#7ea8ff]/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-br from-[#4a7dff]/20 to-[#22d3ee]/20">
                <Icon
                  size={15}
                  className="text-[#7ea8ff]"
                />
              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
                {item.title}
              </p>

              <h5 className="mt-2 font-display text-l text-white">
                {item.value}
              </h5>

              <div className="mt-3 inline-flex items-center  rounded-full border border-cyan-400/20 bg-cyan-400/10 px-1 py-1">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="ml-2 text-xs text-cyan-300">
                  {item.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;