import { motion } from "framer-motion";
import { Database, FileText, BrainCircuit, Bot, LayoutDashboard } from "lucide-react";
import AzureNode from "./AzureNode";

const architecture = [
  { icon: FileText, title: "Resume Upload", subtitle: "PDF / DOCX ingestion" },
  { icon: Database, title: "Azure Blob Storage", subtitle: "Encrypted, private buckets" },
  { icon: BrainCircuit, title: "Document Intelligence", subtitle: "Structured extraction" },
  { icon: Bot, title: "Azure OpenAI", subtitle: "Scoring + rewrite" },
  { icon: LayoutDashboard, title: "Insights Dashboard", subtitle: "Actionable, exportable" },
];

function AzureArchitecture() {
  return (
    <section id="architecture" className="relative mx-auto max-w-7xl px-6 lg:px-8 section">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-end ml-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
         <span className="eyebrow"> Architecture</span>
        <h2 className="mt-5 font-display text-6xl lg:text-7xl text-white leading-[0.95]">
          Cloud native.<br /><em className="text-gradient not-italic italic">Enterprise safe.</em>
        </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg leading-[1.7] text-[#a5b4d0] max-w-lg"
        >
           Every uploaded resume flows through a hardened Azure pipeline -
          nothing leaves your tenant, nothing trains a model.
        </motion.p>
        </div>

      <div className="mt-35 relative">
        {/* vertical rail */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4a7dff]/40 to-transparent -translate-x-px" />

        <div className="space-y-6 lg:space-y-10">
          {architecture.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className={`grid lg:grid-cols-2 gap-6 items-center ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className={`${index % 2 === 1 ? "lg:[direction:ltr] lg:pl-12" : "lg:pr-12"}`}>
                <AzureNode {...item} step={index + 1} />
              </div>
              <div className={`hidden lg:block ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#ffffff]">
                  Stage {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AzureArchitecture;
