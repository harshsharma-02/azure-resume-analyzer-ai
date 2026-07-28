import { motion } from "framer-motion";
import { Upload, Brain, Sparkles, Download } from "lucide-react";
import StepCard from "./StepCard";

const steps = [
  { icon: Upload, title: "Upload", description: "Drop a PDF or DOCX. We parse layout, sections and metadata with Azure Document Intelligence.", num: "01" },
  { icon: Brain, title: "Analyze", description: "Azure OpenAI evaluates content, keywords, verbs and clarity against role-specific rubrics.", num: "02" },
  { icon: Sparkles, title: "Coach", description: "Get an ATS score, missing skills, JD match and rewritten lines you can copy in place.", num: "03" },
  { icon: Download, title: "Export", description: "Download a shareable PDF report or the polished resume, formatted and ATS-safe.", num: "04" },
];

function HowItWorks() {
  return (
    <section id="how" className=" page-container relative mx-auto max-w-7xl px-6 lg:px-8 section">
     <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-end ml-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        
      >
        <span className="eyebrow">— Workflow</span>
        <h2 className="mt-5 font-display text-6xl lg:text-7xl text-white leading-[0.95]">
          From upload to <em className="text-gradient not-italic italic">offer-ready</em><br />in four calm steps.
        </h2>
      </motion.div>
      <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg leading-[1.7] text-[#a5b4d0] max-w-lg"
        >
          No fluff. No dashboards to learn. Each step surfaces one clear signal
          you can act on.
        </motion.p>
</div>
      <div className="mt-30 relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-[52px] left-[-5%] right-[0%] h-px bg-gradient-to-r from-transparent via-[#4a7dff]/40 to-transparent" />

        <div className="grid gap-40 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
            >
              <StepCard {...step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
