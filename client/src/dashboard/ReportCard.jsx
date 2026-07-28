import { FileText, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function ReportCard({ file, score, date }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4 hover:border-[#7ea8ff]/30 hover:bg-white/[0.05] transition"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0">
          <FileText size={18} className="text-[#7ea8ff]" />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-white truncate">{file}</h3>
          <p className="text-xs text-[#7c8db0] font-mono mt-0.5">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7c8db0]">score</div>
          <div className="font-display text-2xl text-gradient">{score}</div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a5b4d0] hover:text-white hover:border-white/25 transition">
          <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.div>
  );
}

export default ReportCard;
