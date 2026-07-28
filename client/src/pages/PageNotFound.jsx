import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="bg-nocturne min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div aria-hidden className="aurora animate-float-slow" style={{ top: "20%", left: "20%", width: "400px", height: "400px", background: "radial-gradient(circle, #4a7dff, transparent 60%)" }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-md">
        <div className="chip mx-auto w-fit">Error / 404</div>
        <h1 className="mt-6 font-display text-[140px] leading-none text-gradient">404</h1>
        <p className="mt-4 text-[#a5b4d0] text-lg">This page slipped out of the resume. Let's get you home.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">Take me home →</Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
