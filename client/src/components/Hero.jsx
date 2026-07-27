import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Button from "./Button";
import DashboardPreview from "./DashboardPreview";

function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-20 px-6 py-24 lg:flex-row">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="max-w-2xl"
        >

          {/* <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Powered by Microsoft Azure AI
          </span> */}

          <h1 className="mt-8 text-6xl font-black leading-tight text-white lg:text-7xl">

            Build a

            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}Resume{" "}
            </span>

            Recruiters Notice

          </h1>

          <p className="mt-8 text-xl leading-9 text-white">

            Analyze your resume using Azure AI,
            receive ATS scoring,
            identify missing skills,
            compare against job descriptions,
            and get actionable recommendations
            in seconds.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Button>

              Analyze Resume

              <ArrowRight className="ml-2 inline" size={20} />

            </Button>

            <button className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold shadow-md transition hover:shadow-xl">

              <PlayCircle />

              Watch Demo

            </button>

          </div>

          <div className="mt-12 flex flex-wrap gap-8">

            <div>

              <h2 className="text-4xl font-bold text-blue-600">
                95%
              </h2>

              <p className="text-slate-500">
                ATS Accuracy
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-blue-600">
                30s
              </h2>

              <p className="text-slate-500">
                Average Analysis
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-blue-600">
                Azure
              </h2>

              <p className="text-slate-500">
                Cloud Powered
              </p>

            </div>

          </div>

        </motion.div>

        {/* Right */}

        <DashboardPreview />

      </div>

    </section>
  );
}

export default Hero;