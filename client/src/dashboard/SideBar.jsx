import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Upload, FileText, Briefcase, User, Settings, Sparkles } from "lucide-react";

const items = [
  { icon: LayoutDashboard, name: "Overview", href: "/dashboard" },
  { icon: Upload, name: "Upload Resume", href: "#" },
  { icon: FileText, name: "Reports", href: "#" },
  { icon: Briefcase, name: "Job Match", href: "#" },
  { icon: Sparkles, name: "Interview AI", href: "#" },
  { icon: User, name: "Profile", href: "#" },
  { icon: Settings, name: "Settings", href: "#" },
];

function SideBar() {
  const location = useLocation();

  return (
    <aside
      data-testid="dashboard-sidebar"
      className="fixed left-0 top-0 h-screen w-[280px] border-r border-white/8 bg-[#050914]/70 backdrop-blur-2xl px-5 py-8 z-20"
    >
      <Link to="/" className="flex items-center gap-2.5 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4a7dff] to-[#22d3ee]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M9 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="leading-tight">
          <div className="font-display text-lg text-white">Azure<span className="text-[#7ea8ff]">.</span>Resume</div>
          <div className="font-mono text-[9px] tracking-[0.32em] text-[#7c8db0] uppercase">AI · Analyzer</div>
        </div>
      </Link>

      <div className="mt-10 mb-4 px-3 eyebrow">- Workspace -</div>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.href;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-all ${
                active
                  ? "bg-white/[0.06] text-white border border-white/10"
                  : "text-[#a5b4d0] hover:bg-white/[0.04] hover:text-white border border-transparent"
              }`}
            >
              <Icon size={17} className={active ? "text-[#7ea8ff]" : "text-[#7c8db0]"} />
              {item.name}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#67e8f9] pulse-ring" />}
            </a>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <div className="absolute left-5 right-5 bottom-6 glass p-5">
        <div className="chip !bg-[#f6c26b]/10 !border-[#f6c26b]/30 !text-[#f6c26b]">Pro</div>
        <h4 className="mt-3 font-display text-xl text-white leading-tight">Unlock unlimited analyses</h4>
        <p className="mt-1.5 text-xs text-[#a5b4d0]">JD match, interview coach and premium exports.</p>
        <button className="btn-primary w-full mt-4 !py-2.5 !text-xs justify-center">Upgrade</button>
      </div>
    </aside>
  );
}

export default SideBar;
