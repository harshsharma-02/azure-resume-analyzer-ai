import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-nocturne text-slate-100 ">
      {/* Aurora blobs */}
      <div
        aria-hidden
        className="aurora animate-float-slow"
        style={{
          top: "-120px",
          left: "-100px",
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle at 30% 30%, #4a7dff, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="aurora animate-float-slow"
        style={{
          top: "260px",
          right: "-140px",
          width: "560px",
          height: "560px",
          background:
            "radial-gradient(circle at 70% 40%, #22d3ee 0%, transparent 65%)",
          animationDelay: "3s",
        }}
      />
      {/* <div
        aria-hidden
        className="aurora animate-float-slow"
        style={{
          bottom: "-200px",
          left: "20%",
          width: "620px",
          height: "620px",
          background:
            "radial-gradient(circle, #6366f1 0%, transparent 65%)",
          animationDelay: "6s",
        }}
      /> */}

      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

export default MainLayout;
