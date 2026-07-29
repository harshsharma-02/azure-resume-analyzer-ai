import { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-nocturne min-h-screen relative">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`
          relative z-10 transition-[width, padding] duration-300 ease-in-out
          ${collapsed ? "ml-24" : "ml-[280px]"}
        `}
      >
        <Topbar />
        <main className="p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;