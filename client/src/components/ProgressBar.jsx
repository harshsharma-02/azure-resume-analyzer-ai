import { motion } from "framer-motion";

function ProgressBar({ title, value }) {
  return (
    <div className="space-y-2">

      <div className="flex justify-between">

        <span className="font-medium text-slate-700">
          {title}
        </span>

        <span className="font-semibold text-blue-600">
          {value}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
          }}
          className="h-full rounded-full bg-linear-to-r from-blue-600 to-cyan-400"
        />

      </div>

    </div>
  );
}

export default ProgressBar;