import {
  FileText,
  ArrowUpRight,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";

function ReportCard({
  file,
  score,
  date,
  active = false,
  onDelete,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className={`
        relative
        group
        flex
        items-center
        justify-between
        rounded-2xl
        p-4
        transition-all
        duration-300
        ${
          active
            ? "border border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
            : "border border-white/8 bg-white/[0.03] hover:border-[#7ea8ff]/30 hover:bg-white/[0.05]"
        }
      `}
    >
      {active && (
        <div className="absolute -top-2 right-4 flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-500 px-2 text-[10px] font-semibold uppercase tracking-wider text-black">
          <CheckCircle2 size={12} />
          Current
        </div>
      )}

      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`
            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition
            ${
              active
                ? "border-cyan-400/30 bg-cyan-500/10"
                : "border-white/10 bg-white/5"
            }
          `}
        >
          <FileText
            size={18}
            className={active ? "text-cyan-300" : "text-[#7ea8ff]"}
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-medium text-white">
            {file}
          </h3>

          <p className="mt-1 font-mono text-xs text-[#7c8db0]">
            {date}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="text-right">
          <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#94b1eb]">
            ATS
          </div>

          <div className="font-display text-2xl text-gradient">
            {score}
          </div>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className={`
            flex h-9 w-9 items-center justify-center rounded-xl border transition
            ${
              active
                ? "border-cyan-400/30 bg-cyan-500/10 text-cyan-300"
                : "border-white/10 bg-white/5 text-[#a5b4d0] hover:border-white/25 hover:text-white"
            }
          `}
        >
          <ArrowUpRight size={15} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a5b4d0] transition hover:border-red-400/40 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default ReportCard;