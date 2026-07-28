import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description, accent = "#7ea8ff", index = 0 }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      className="group glass hover-lift relative p-7 overflow-hidden h-full"
    >
      {/* Corner index */}
      <div className="absolute right-6 top-6 font-mono text-[10px] tracking-[0.25em] text-[#ffffff]">
        0{index + 1}
      </div>

      {/* Glow */}
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="relative mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <Icon size={22} style={{ color: accent }} />
        <span
          className="absolute inset-0 rounded-2xl opacity-40"
          style={{ boxShadow: `inset 0 0 24px ${accent}30` }}
        />
      </div>

      <h3 className="font-display text-2xl text-white">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-[#a5b4d0]">{description}</p>

      {/* Bottom line */}
      <div
        className="mt-6 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default FeatureCard;
