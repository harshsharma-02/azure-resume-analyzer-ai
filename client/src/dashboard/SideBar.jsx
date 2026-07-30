import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  User,
  Settings,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, name: "Overview", target: "dashboard" },
  { icon: FileText, name: "Reports", target: "reports" },
  { icon: Briefcase, name: "Job Match", target: "match" },
  { icon: Sparkles, name: "Resume Review", target: "review" },
  { icon: Settings, name: "Settings", target: "settings" },
];

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (id === "dashboard") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Section "${id}" not found`);
    }
  };

  return (
    <motion.aside
      animate={{
        width: collapsed ? 96 : 275,
        paddingLeft: collapsed ? 12 : 20,
        paddingRight: collapsed ? 12 : 20,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        fixed left-0 top-0 z-20 h-screen
        border-r border-white/10
        bg-[#050914]/75
        backdrop-blur-2xl
        // ${collapsed ? "w-24 px-3" : "w-[280px] px-5"}
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between pt-8">
        <Link
          to="/"
          className={`flex items-center ${
            collapsed ? "justify-center w-full" : "gap-3"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4a7dff] to-[#22d3ee]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 13l2 2 4-4" />
            </svg>
          </div>

          {!collapsed && (
            <div>
              <h2 className="font-display text-xl text-white">
                HireSense
                <span className="text-[#7ea8ff]">.Ai</span>
              </h2>

              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#7c8db0]">
                Resume • Analyzer
              </p>
            </div>
          )}
        </Link>

        <motion.button className="rounded-lg p-2 text-[#7ea8ff] hover:bg-white/5"
    animate={{
        rotate: collapsed ? 180 : 0,
    }}
    transition={{
        duration: 0.35,
    }}
    onClick={() => setCollapsed(!collapsed)}
>
    <PanelLeftClose />
</motion.button>
      </div>

      

      {!collapsed && (
        <div className="mt-10 mb-4 px-3 eyebrow">- Workspace -</div>
      )}

      <nav className={collapsed ? "mt-5 space-y-2" : ""}>
        {items.map((item) => {
          const Icon = item.icon;

          if (item.href) {
            const active = location.pathname === item.target;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center
                  ${collapsed ? "justify-center px-0 py-3" : "gap-5 px-3 py-3"}
                  rounded-xl
                  transition-all
                  ${
                    active
                      ? "bg-white/10 border border-white/10 text-white"
                      : "text-[#a5b4d0] hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={active ? "text-[#7ea8ff]" : "text-[#7c8db0]"}
                />

                {!collapsed && (
                  <>
                    <motion.span
                      animate={{
                        opacity: collapsed ? 0 : 1,
                        width: collapsed ? 0 : "auto",
                        marginLeft: collapsed ? 0 : 20,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>

                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </>
                )}
              </Link>
            );
          }

          return (
            <button
              key={items.name}
              onClick={() => scrollToSection(item.target)}
              className={`
                w-full
                group
                flex items-center
                 hover-lift
                ${collapsed ? "justify-center px-0 py-3" : "gap-5 px-3 py-3"}
                rounded-xl
                transition-all
                text-[#a5b4d0]
                hover:bg-white/5
                hover:text-white
              `}
            >
              <Icon size={20} className="text-[#7c8db0]" />

              {!collapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
