import { motion } from "framer-motion";

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
      className="w-full max-w-xl"
    >

      <div className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold">
              Resume Report
            </h3>

            <p className="text-slate-500">
              AI Analysis Complete
            </p>

          </div>

          <div className="rounded-xl bg-blue-100 px-4 py-2 font-bold text-blue-600">
            ATS 94%
          </div>

        </div>

        <div className="space-y-5">

          <Card
            title="Resume Strength"
            value="Excellent"
          />

          <Card
            title="Cloud Skills"
            value="Azure • Docker • React"
          />

          <Card
            title="Missing Skills"
            value="Terraform • Azure Functions"
          />

          <Card
            title="Grammar"
            value="9.7 / 10"
          />

        </div>

      </div>

    </motion.div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:scale-[1.02]">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 font-bold text-slate-800">
        {value}
      </h3>

    </div>
  );
}

export default DashboardPreview;