import { motion } from "framer-motion";

function AzureNode({ icon: Icon, title, subtitle }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      className="
      relative
      w-full
      max-w-xs
      rounded-3xl
      border
      border-white/40
      bg-white/70
      p-6
      shadow-xl
      backdrop-blur-xl
      "
    >
      <div
        className="
        mb-5
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-linear-to-r
        from-blue-600
        to-cyan-500
        text-white
        "
      >
        <Icon size={30} />
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default AzureNode;