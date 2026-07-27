import { motion } from "framer-motion";

import {
  Brain,
  BadgeCheck,
  Target,
  BarChart3,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description:
      "Analyze resumes with Azure AI to identify strengths, weaknesses, and improvement opportunities.",
  },
  {
    icon: BadgeCheck,
    title: "ATS Score",
    description:
      "Receive an ATS compatibility score with detailed recommendations for optimization.",
  },
  {
    icon: Target,
    title: "Job Matching",
    description:
      "Compare your resume against any job description and identify missing requirements.",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Detection",
    description:
      "Discover missing technical skills and certifications required for your target role.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-semibold uppercase tracking-[0.3em] text-blue-600">
          Features
        </p>

        <h2 className="mt-4 text-5xl font-black text-slate-900">
          Everything You Need
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Azure Resume Analyzer combines AI powered resume analysis,
          ATS optimization, job matching and cloud intelligence
          into one seamless experience.
        </p>
      </motion.div>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
            }}
            viewport={{ once: true }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;