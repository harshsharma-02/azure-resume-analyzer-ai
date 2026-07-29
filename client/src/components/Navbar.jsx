import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <motion.header
      data-testid="site-navbar"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="sticky top-4 z-50 px-4 lg:px-6"
    >
      <nav
        className={` flex items-center justify-between rounded-full px-3 lg:px-4 py-2 transition-all duration-500 page-container ${
          scrolled
            ? "glass border-white/15 shadow-2xl  "
            : "border border-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          data-testid="nav-logo"
          className="flex items-center gap-2.5 pl-2"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4a7dff] to-[#22d3ee] shadow-[0_8px_24px_-8px_rgba(74,125,255,0.6)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 13l2 2 4-4" />
            </svg>
            <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
          </div>
          <div className="leading-tight">
            <div className="font-mono text-2xl text-white -mb-0.5">Hire<span className="text-[#7ea8ff]"></span>Sense Ai</div>
            <div className="font-mono text-[12px] tracking-[0.35em] text-[#6788c9] uppercase">Resume · Analyzer</div>
          </div>
        </Link>

        {/* Center menu */}
        {!isDashboard && (
          <div className="hidden lg:flex items-center gap-1 font-mono text-[13px] tracking-[0.2em] uppercase">
            {[
              { href: "#features", label: "Features" },
              { href: "#how", label: "Workflow" },
              { href: "#preview", label: "Preview" },
              { href: "#architecture", label: "Architecture" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Right */}
        <div className="hidden lg:flex items-center gap-2 pr-1">
          <Link
            to="/login"
            data-testid="nav-login-btn"
            className="btn-ghost"
          >
            Sign in
          </Link>
          <Link to="/register" data-testid="nav-signup-btn" className="btn-primary text-[13px]">
            Get started
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2 pr-1">
          <Link to="/login" className="btn-ghost text-xs px-3 py-2">Sign in</Link>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
