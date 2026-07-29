import { motion } from "framer-motion";
import { CheckCircle2, XCircle, TrendingUp, Sparkles } from "lucide-react";
import ProgressBar from "./ProgressBar";
import SkillTag from "./SkillTag";
import RecommendationCard from "./RecommendationCard";

const detected = ["Azure", "React", "Docker", "Node.js", "MongoDB", "TypeScript"];
const missing = ["Terraform", "Azure Functions", "PowerShell"];
const recommendations = [
  "Quantify the AKS migration - mention users served or cost saved.",
  "Lead each bullet with a strong verb (led, shipped, cut, scaled).",
  "Move Azure certifications above Education.",
  "Add a one-line summary tailored to Cloud roles.",
];

function AnalysisPreview() {
  return (
    <section id="preview" className="relative mx-auto max-w-7xl px-6 lg:px-8 section">
      <div className="max-w-2xl ml-120">
        <span className="eyebrow">- Live preview -</span>
        <h2 className="mt-5 font-display text-6xl lg:text-7xl text-white leading-[0.95]">
          What your report<br />
          <em className="text-gradient not-italic italic">actually looks</em> like.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mt-35 glass p-8 lg:p-12"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="chip">DATABASE / harsh_resume.pdf</div>
            <h3 className="mt-4 font-display text-4xl text-white">Analysis complete</h3>
            <p className="mt-2 text-[#a5b4d0]">Azure AI evaluated 6 dimensions across 42 signals.</p>
          </div>
          <div className="relative">
            <div className="glass !rounded-2xl px-8 py-5 min-w-[180px]">
              <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">ATS score</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-6xl text-gradient">94</span>
                <span className="text-[#7c8db0] font-display text-xl">/100</span>
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-[#34d399] font-mono">
                <TrendingUp size={12} /> +12
              </div>
            </div>
          </div>
        </div>

        {/* Progress rows */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ProgressBar title="Formatting" value={96} />
          <ProgressBar title="Keywords" value={91} />
          <ProgressBar title="Grammar" value={97} />
          <ProgressBar title="Overall match" value={94} />
        </div>

        {/* Skills */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.24em] text-[#34d399]">
              <CheckCircle2 size={14} /> Detected skills
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {detected.map((s) => <SkillTag key={s} skill={s} variant="detected" />)}
            </div>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.24em] text-[#f87171]">
              <XCircle size={14} /> Missing skills
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {missing.map((s) => <SkillTag key={s} skill={s} variant="missing" />)}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <h4 className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.24em] text-[#7ea8ff]">
            <Sparkles size={14} /> AI recommendations
          </h4>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {recommendations.map((t) => <RecommendationCard key={t} text={t} />)}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AnalysisPreview;
