import { motion } from "framer-motion";

function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {value}
          </h2>

          <p className="mt-3 text-green-600 font-medium">
            {change}
          </p>

        </div>

        <div
          className={`
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          ${color}
          text-white
          `}
        >
          <Icon size={30}/>
        </div>

      </div>
    </motion.div>
  );
}

export default StatsCard;