import Sidebar from "./SideBar";
import Topbar from "./TopBar";

function DashboardLayout({ children }) {
  return (
    <div className="bg-nocturne min-h-screen relative">
      <div aria-hidden className="aurora" style={{ top: "-80px", left: "20%", width: "500px", height: "500px", background: "radial-gradient(circle, #4a7dff, transparent 65%)", opacity: 0.35 }} />
      <div aria-hidden className="aurora" style={{ bottom: "10%", right: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, #22d3ee, transparent 65%)", opacity: 0.25 }} />

      <Sidebar />
      <div className="ml-[280px] relative z-10">
        <Topbar />
        <main className="p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
