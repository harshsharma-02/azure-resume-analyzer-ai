import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp } from "lucide-react";

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* Halo */}
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-tr from-[#4a7dff]/20 via-transparent to-[#22d3ee]/20 blur-2xl" />

      <div className="glass p-6 lg:p-7">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f6c26b]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/70" />
            </div>
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">
              analysis / harsh_sharma.pdf
            </div>
          </div>
          <div className="chip !text-[#a5f3ff] !border-[#22d3ee]/30 !bg-[#22d3ee]/5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67e8f9] pulse-ring" />
            LIVE
          </div>
        </div>

        {/* Big score */}
        <div className="mt-8 grid grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">
              ATS COMPATIBILITY
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-display text-7xl text-gradient"
              >
                94
              </motion.span>
              <span className="font-display text-2xl text-[#7c8db0]">/100</span>
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#34d399]">
              <TrendingUp size={13} />
              <span className="font-mono">+12 vs last draft</span>
            </div>
          </div>
          <div className="relative h-24 w-24">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(148,175,218,0.15)" strokeWidth="2.5" />
              <motion.circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="url(#g1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 6 }}
                transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
                pathLength="100"
              />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7ea8ff" />
                  <stop offset="100%" stopColor="#67e8f9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Metrics rows */}
        <div className="mt-8 space-y-3.5">
          {[
            { l: "Formatting", v: 96 },
            { l: "Keyword density", v: 91 },
            { l: "Impact verbs", v: 88 },
            { l: "Cloud proficiency", v: 94 },
          ].map((m, i) => (
            <div key={m.l}>
              <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-[#7c8db0]">
                <span>{m.l}</span>
                <span className="text-[#dbe4ff]">{m.v}%</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.v}%` }}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.2, 0.7, 0.2, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[#7ea8ff] to-[#67e8f9]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-7 space-y-2.5">
          {[
            "Add measurable outcomes to Azure migration project.",
            "Surface Terraform experience above the fold.",
          ].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.15 }}
              className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-3"
            >
              <CheckCircle2 size={16} className="mt-0.5 text-[#67e8f9] shrink-0" />
              <p className="text-[13px] leading-relaxed text-[#dbe4ff]">{t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPreview;
