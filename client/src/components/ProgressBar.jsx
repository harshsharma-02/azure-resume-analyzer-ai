import { motion } from "framer-motion";

function ProgressBar({ title, value }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#a5b4d0]">
          {title}
        </span>
        <span className="font-display text-xl text-white">
          {value}<span className="text-[#7c8db0] text-sm">%</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5 border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[#4a7dff] via-[#7ea8ff] to-[#67e8f9]"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
