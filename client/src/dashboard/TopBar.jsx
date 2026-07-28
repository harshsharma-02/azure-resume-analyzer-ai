import { Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const user = (() => { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      data-testid="dashboard-topbar"
      className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#050914]/60 backdrop-blur-2xl px-8 py-4"
    >
      <div>
        <div className="eyebrow">— Dashboard</div>
        <h2 className="font-display text-3xl text-white mt-0.5">Overview</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 min-w-[280px]">
          <Search size={15} className="text-[#7c8db0]" />
          <input type="text" placeholder="Search reports, skills, roles…" className="bg-transparent text-sm text-white placeholder:text-[#5a6d92] outline-none flex-1" />
          <span className="font-mono text-[10px] text-[#5a6d92] border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
        </div>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#a5b4d0] hover:text-white transition">
          <Bell size={16} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#67e8f9] pulse-ring" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#4a7dff] to-[#22d3ee] flex items-center justify-center text-white text-sm font-medium">
            {(user?.name || "U").slice(0, 1).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-white">{user?.name || "Guest"}</div>
            <div className="font-mono text-[10px] text-[#7c8db0] uppercase tracking-[0.15em]">Free · plan</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          data-testid="topbar-logout"
          className="btn-ghost !px-3 !py-2 text-xs"
        >
          <LogOut size={14} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
