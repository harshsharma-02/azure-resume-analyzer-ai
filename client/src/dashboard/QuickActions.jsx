import generateReport from "../utils/generateReport";
import { Upload, FileSearch, Download, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  { icon: Upload, title: "Upload Resume" },
  { icon: FileSearch, title: "Analyze Resume" },
  { icon: Briefcase, title: "Job Match" },
  { icon: Download, title: "Download Report" },
];

function QuickActions({ resume }) {
  const handleAction = (title) => {
    if (title === "Download Report") {
      if (!resume) return alert("No resume found.");
      generateReport(resume);
    }
  };

  return (
    <div className="glass p-6  hover-lift">
      <div className="eyebrow"> Shortcuts</div>
      <h2 className="mt-2 font-display text-2xl text-white text-center">Quick Actions</h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.title}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(action.title)}
              className="group rounded-2xl border border-white/8 bg-white/[0.03] p-4 hover:border-[#7ea8ff]/30 hover:bg-white/[0.05] transition text-left"
            >
              <Icon size={18} className="text-[#7ea8ff]" />
              <p className="mt-3 text-sm text-white font-medium">{action.title}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
