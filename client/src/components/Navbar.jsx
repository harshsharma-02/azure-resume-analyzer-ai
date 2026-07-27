import { Link } from "react-router-dom";
import { Cloud, Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-6 left-60 z-50 ">
      <div className="mx-auto max-w-7xl px-0 pt-6">

        <nav
          className="
          flex items-center justify-between

          rounded-xl

          border border-white/40

          bg-dark-blue-900/60

          backdrop-blur-2xl

          shadow-lg

          px-8

          py-4
            "
        >
          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-xl

              bg-linear-to-r

              from-blue-600

              to-cyan-500

              text-white
              "
            >
              <Cloud size={24} />
            </div>

            <div>
              <h2 className="font-bold text-xl text-white">
                Azure Resume
              </h2>

              <p className="text-sm text-white">
                AI Analyzer
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-10">

            <a
              href="#features"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#how"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              How it Works
            </a>

            <a
              href="#faq"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              FAQ
            </a>

          </div>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-4">

            <Link
              to="/login"
              className="
              rounded-lg

              px-5

              py-2

              font-medium

              transition

              hover:bg-slate-100
              "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
              rounded-xl

              bg-linear-to-br

              from-blue-600

              to-cyan-500

              px-6

              py-3

              font-semibold

              text-white

              shadow-lg

              transition

              hover:scale-105
              "
            >
              Get Started
            </Link>

          </div>

          {/* Mobile */}

          <button className="lg:hidden">
            <Menu size={30} />
          </button>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;