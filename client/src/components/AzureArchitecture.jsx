import {
  Database,
  FileText,
  BrainCircuit,
  Bot,
  LayoutDashboard,
} from "lucide-react";

import AzureNode from "./AzureNode";

const architecture = [
  {
    icon: FileText,
    title: "Resume Upload",
    subtitle: "PDF / DOCX",
  },
  {
    icon: Database,
    title: "Azure Blob Storage",
    subtitle: "Secure File Storage",
  },
  {
    icon: BrainCircuit,
    title: "Document Intelligence",
    subtitle: "Extract Resume Content",
  },
  {
    icon: Bot,
    title: "Azure OpenAI",
    subtitle: "ATS + AI Analysis",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    subtitle: "Interactive Reports",
  },
];

function AzureArchitecture() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">

      <div className="text-center">

        <p className="font-semibold uppercase tracking-[0.3em] text-blue-600">
          Azure Architecture
        </p>

        <h2 className="mt-4 text-5xl font-black">
          Powered by Microsoft Azure
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Every uploaded resume follows a secure cloud pipeline,
          from storage and document extraction to AI analysis
          and interactive reporting.
        </p>

      </div>

      <div className="mt-20 flex flex-col items-center gap-8">

        {architecture.map((item, index) => (
          <div
            key={item.title}
            className="flex flex-col items-center"
          >
            <AzureNode {...item} />

            {index !== architecture.length - 1 && (
              <div className="my-4 h-16 w-1 rounded-full bg-linear-to-b from-blue-500 to-cyan-400" />
            )}
          </div>
        ))}

      </div>

    </section>
  );
}

export default AzureArchitecture;