import generateReport from "../utils/generateReport";

import { Upload, FileSearch, Download, Briefcase } from "lucide-react";

const actions = [
  {
    icon: Upload,
    title: "Upload Resume",
  },

  {
    icon: FileSearch,
    title: "Analyze Resume",
  },

  {
    icon: Briefcase,
    title: "Job Match",
  },

  {
    icon: Download,
    title: "Download Report",
  },
];

function QuickActions({ resume }) {
  const handleAction = (title) => {
    if (title === "Download Report") {
      if (!resume) {
        alert("No resume found.");
        return;
      }

      generateReport(resume);
    }
  };
  return (
    <div className=" rounded-3xl bg-white p-8 shadow-lg">
      <h2 className=" mb-8 text-2xl font-bold">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => handleAction(action.title)}
              className="
  rounded-2xl
  border
  p-6
  transition
  hover:border-blue-600
  hover:bg-blue-50
"
            >
              <Icon size={28} className="mx-auto text-blue-600" />

              <p className="mt-4">{action.title}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;
