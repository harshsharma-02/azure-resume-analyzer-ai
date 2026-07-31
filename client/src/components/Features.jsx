import { motion } from "framer-motion";
import { Brain, BadgeCheck, Target, BarChart3, Zap, ShieldCheck,ChevronRight } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  { icon: Brain, title: "Deep AI Analysis", description: "Azure OpenAI reads your resume the way a senior recruiter would — spotting weak verbs, buried achievements and stale phrasing.", accent: "#7ea8ff" },
  { icon: BadgeCheck, title: "ATS Compatibility", description: "A calibrated score (0–100) against modern applicant tracking systems, with fixes ranked by impact.", accent: "#67e8f9" },
  { icon: Target, title: "Job Description Match", description: "Paste any JD. Get a percentage match, missing keywords and a rewritten summary tailored to the role.", accent: "#f6c26b" },
  { icon: BarChart3, title: "Skill Gap Radar", description: "Visual maps of technical, cloud and soft skills — plus the exact certifications recruiters expect this quarter.", accent: "#a78bfa" },
  { icon: Zap, title: "Interview Coach", description: "Generates likely interview questions from your resume + JD, tagged by difficulty and topic.", accent: "#34d399" },
  { icon: ShieldCheck, title: "Private & Encrypted", description: "Files live in Azure Blob with SSE. Nothing is trained on. Delete any time.", accent: "#f472b6" },
];

function Features() {
  return (
    <section id="features" className="page-container relative mx-auto max-w-7xl px-4 lg:px-8 section">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-end ml-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">Capabilities</span>
          <h2 className=" mt-5 font-display text-6xl lg:text-7xl text-white leading-[0.95]">
            Every part of your<br /> resume, <em className="text-gradient not-italic">interrogated</em>.
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg leading-[1.7] text-[#a5b4d0] max-w-lg"
        >
          Six specialists working in parallel - parsing, scoring, matching,
          coaching. Built on Azure Document Intelligence and OpenAI, tuned for
          engineering, product and cloud roles.
        </motion.p>
      </div>

      <div className="mt-30 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
          >
            <FeatureCard {...feature} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;
