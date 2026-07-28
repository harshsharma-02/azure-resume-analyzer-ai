import { motion } from "framer-motion";

function StepCard({ icon: Icon, title, description, num }) {
  return (
    <div className="relative text-left">
      {/* Node */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-full glass"
      >
        <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10">
          <Icon size={26} className="text-[#7ea8ff]" />
        </div>
        <span className="absolute -top-1 -right-1 font-mono text-[10px] tracking-[0.2em] text-[#7c8db0] bg-[#0a1120] border border-white/10 rounded-full px-2 py-1">
          {num}
        </span>
      </motion.div>

      <h3 className="mt-8 font-display text-3xl text-white">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-[#a5b4d0] max-w-[280px]">
        {description}
      </p>
    </div>
  );
}

export default StepCard;
