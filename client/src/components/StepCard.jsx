import { motion } from "framer-motion";

function StepCard({ icon: Icon, title, description, isLast }) {
  return (
    <div className="relative flex flex-col items-center text-center">

      {!isLast && (
        <div className="absolute top-10 left-1/2 hidden h-1 w-full translate-x-1/2 bg-linear-to-r from-blue-500 to-cyan-400 lg:block" />
      )}

      <motion.div
        whileHover={{ scale: 1.08 }}
        className="
          relative
          z-10
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-linear-to-r
          from-blue-600
          to-cyan-500
          text-white
          shadow-xl
        "
      >
        <Icon size={34} />
      </motion.div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-slate-600 leading-7">
        {description}
      </p>

    </div>
  );
}

export default StepCard;