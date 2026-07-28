import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle, Sparkles } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
  }),
};

function Hero() {
  return (
    <section className="page-container relative overflow-hidden pt-2 lg:pt-20">
       <div className="mx-auto w-full px-8 xl:px-12">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-10 items-center pb-16 lg:pb-20">
          {/* LEFT */}
          <motion.div initial="hidden" animate="show" className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 chip"
            >
              <Sparkles size={12} className="text-[#7ea8ff]" />
              Powered by Azure OpenAI
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-8 font-display text-[62px] leading-[0.95] tracking-tight text-white lg:text-[84px]"
            >
              A resume<br />
              <em className="text-gradient not-italic">recruiters</em>{" "}
              <span className="italic text-[#dbe4ff]">actually</span>
              <br />
              <span className="text-gradient-warm italic">read.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 text-lg leading-[1.7] text-[#a5b4d0] max-w-xl"
            >
              A private Azure AI copilot that scores your resume against ATS,
              maps skill gaps against real job descriptions and rewrites the
              lines that lose you interviews - in under thirty seconds.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/signup"
                data-testid="hero-cta-analyze"
                className="btn-primary"
              >
                Analyze my resume
                <ArrowUpRight size={18} />
              </Link>
              <button data-testid="hero-cta-demo" className="btn-ghost">
                <PlayCircle size={18} className="text-[#7ea8ff]" />
                Watch 60-sec demo
              </button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-14 grid grid-cols-3 gap-8 max-w-lg"
            >
              {[
                { v: "95%", l: "ATS accuracy" },
                { v: "28s", l: "Avg. analysis" },
                { v: "12k+", l: "Resumes scored" },
              ].map((m) => (
                <div key={m.l} className="relative">
                  <div className="font-display text-4xl text-white">{m.v}</div>
                  <div className="mt-1.5 font-mono text-[10px] tracking-[0.24em] uppercase text-[#7c8db0]">
                    {m.l}
                  </div>
                  <div className="absolute -top-2 left-0 h-px w-8 bg-gradient-to-r from-[#7ea8ff] to-transparent" />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="relative">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0  bg-gradient-to-b from-transparent to-[#050914]" />
    </section>
  );
}

export default Hero;
