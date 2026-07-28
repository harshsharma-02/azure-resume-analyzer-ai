import { motion } from "framer-motion";

function AzureNode({ icon: Icon, title, subtitle, step }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass hover-lift relative flex items-center gap-5 p-6"
    >
      <div className="relative shrink-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Icon size={22} className="text-[#7ea8ff]" />
        </div>
        <span className="absolute -top-2 -left-2 font-mono text-[9px] px-1.5 py-0.5 rounded-full bg-[#0a1120] border border-white/10 text-[#7c8db0]">
          0{step}
        </span>
      </div>
      <div>
        <h3 className="font-display text-2xl text-white">{title}</h3>
        <p className="text-sm text-[#a5b4d0] mt-1">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export default AzureNode;
