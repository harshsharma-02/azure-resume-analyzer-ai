import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Briefcase,
  User,
  Settings,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, name: "Overview", href: "/dashboard" },
  { icon: Upload, name: "Upload Resume", href: "#" },
  { icon: FileText, name: "Reports", href: "#" },
  { icon: Briefcase, name: "Job Match", href: "#" },
  { icon: Sparkles, name: "Interview AI", href: "#" },
  { icon: User, name: "Profile", href: "#" },
  { icon: Settings, name: "Settings", href: "#" },
];

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-20 h-screen
        border-r border-white/10
        bg-[#050914]/75
        backdrop-blur-2xl
        transition-[width,padding]
duration-300
ease-in-out
        ${collapsed ? "w-24 px-3" : "w-[280px] px-5"}
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

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-lg p-2 text-[#7ea8ff] transition hover:bg-white/5"
          >
            <PanelLeftClose size={20} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-6 flex rounded-lg p-2 text-[#7ea8ff] transition hover:bg-white/5"
        >
          <PanelLeftOpen size={20} />
        </button>
      )}

      {!collapsed && (
        <div className="mt-10 mb-4 px-3 eyebrow">
          - Workspace -
        </div>
      )}

      {/* Navigation */}

      <nav className={` ${collapsed ? "mt-5 space-y-2" : ""}`}>
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center
                ${
                  collapsed
                    ? "justify-center px-0 py-3"
                    : "gap-5 px-3 py-3"
                }
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
                  <span>{item.name}</span>

                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Pro Card

      {!collapsed && (
        <div className="absolute bottom-15 left-5 right-5 glass p-5">
          <div className="chip !bg-[#f6c26b]/10 !border-[#f6c26b]/30 !text-[#f6c26b]">
            PRO
          </div>

          <h3 className="mt-3 font-display text-xl text-white">
            Unlimited Analysis
          </h3>

          <p className="mt-2 text-xs text-[#a5b4d0]">
            Unlock JD Matching, Interview AI and premium PDF exports.
          </p>

          <button className="btn-primary mt-4 w-full justify-center">
            Upgrade
          </button>
        </div>
      )} */}
    </aside>
  );
}

export default Sidebar;