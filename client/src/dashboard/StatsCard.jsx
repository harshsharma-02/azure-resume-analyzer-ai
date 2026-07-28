import { motion } from "framer-motion";

function StatsCard({ icon: Icon, title, value, change, accent = "#7ea8ff", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="glass hover-lift p-6 relative overflow-hidden"
    >
      <div aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-3xl" style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }} />

      <div className="flex items-start justify-between relative">
        <div>
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">{title}</div>
          <div className="mt-3 font-display text-5xl text-white">{value}</div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#a5b4d0]">
            <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
            {change}
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Icon size={18} style={{ color: accent }} />
        </div>
      </div>
    </motion.div>
  );
}

export default StatsCard;
