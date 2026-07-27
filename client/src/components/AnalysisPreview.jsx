import { motion } from "framer-motion";

import ProgressBar from "./ProgressBar";
import SkillTag from "./SkillTag";
import RecommendationCard from "./RecommendationCard";

const skills = [
  "Azure",
  "React",
  "Docker",
  "Node.js",
  "MongoDB",
];

const missing = [
  "Terraform",
  "Azure Functions",
  "PowerShell",
];

const recommendations = [
  "Add measurable achievements.",
  "Highlight Azure certifications.",
  "Improve action verbs.",
  "Mention cloud deployment experience.",
];

function AnalysisPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">

      <div className="mb-16 text-center">

        <p className="font-semibold uppercase tracking-[0.3em] text-blue-600">
          Live Preview
        </p>

        <h2 className="mt-4 text-5xl font-black">
          AI Resume Analysis
        </h2>

        <p className="mt-6 text-lg text-slate-600">
          Experience the insights before creating an account.
        </p>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="
        rounded-3xl
        border
        border-white/40
        bg-white/70
        p-10
        shadow-2xl
        backdrop-blur-xl
        "
      >

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <h3 className="text-3xl font-bold">
              Resume Analysis Complete
            </h3>

            <p className="text-slate-500">
              Azure AI successfully analyzed your resume.
            </p>

          </div>

          <div className="rounded-2xl bg-blue-600 px-8 py-4 text-white">

            <div className="text-sm">
              ATS Score
            </div>

            <div className="text-4xl font-black">
              94%
            </div>

          </div>

        </div>

        <div className="mt-12 space-y-8">

          <ProgressBar title="Formatting" value={96} />
          <ProgressBar title="Keywords" value={91} />
          <ProgressBar title="Grammar" value={97} />
          <ProgressBar title="Overall Match" value={94} />

        </div>

        <div className="mt-12">

          <h3 className="mb-5 text-xl font-bold">
            Detected Skills
          </h3>

          <div className="flex flex-wrap gap-3">

            {skills.map(skill => (
              <SkillTag
                key={skill}
                skill={skill}
              />
            ))}

          </div>

        </div>

        <div className="mt-12">

          <h3 className="mb-5 text-xl font-bold text-red-500">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-3">

            {missing.map(skill => (
              <div
                key={skill}
                className="rounded-full bg-red-100 px-4 py-2 font-medium text-red-600"
              >
                {skill}
              </div>
            ))}

          </div>

        </div>

        <div className="mt-12">

          <h3 className="mb-6 text-xl font-bold">
            AI Recommendations
          </h3>

          <div className="grid gap-4 md:grid-cols-2">

            {recommendations.map(item => (
              <RecommendationCard
                key={item}
                text={item}
              />
            ))}

          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default AnalysisPreview;