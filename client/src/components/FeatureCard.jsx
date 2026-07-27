import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/40
      bg-white/70
      backdrop-blur-xl
      p-8
      shadow-xl
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        -right-10
        -top-10
        h-40
        w-40
        rounded-full
        bg-blue-400/20
        blur-3xl
        transition
        duration-500
        group-hover:scale-150
        "
      />

      {/* Icon */}

      <div
        className="
        mb-6
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
        shadow-lg
        "
      >
        <Icon size={32} />
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-600">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;