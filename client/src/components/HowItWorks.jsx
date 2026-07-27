import {
  Upload,
  Brain,
  Sparkles,
  Download,
} from "lucide-react";

import { motion } from "framer-motion";

import StepCard from "./StepCard";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description:
      "Upload your resume securely in PDF or DOCX format.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Azure AI extracts text and evaluates resume quality.",
  },
  {
    icon: Sparkles,
    title: "Recommendations",
    description:
      "Receive ATS score, skill gaps and personalized improvements.",
  },
  {
    icon: Download,
    title: "Download",
    description:
      "Download your detailed AI-generated resume report.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <p className="font-semibold uppercase tracking-[0.3em] text-blue-600">
          Workflow
        </p>

        <h2 className="mt-4 text-5xl font-black">
          How It Works
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          From upload to actionable insights in four simple steps.
        </p>

      </motion.div>

      <div className="mt-20 grid gap-16 lg:grid-cols-4">

        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
            }}
          >
            <StepCard
              {...step}
              isLast={index === steps.length - 1}
            />
          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default HowItWorks;