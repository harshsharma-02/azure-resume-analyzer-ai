import { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import { motion } from "framer-motion";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-nocturne min-h-screen relative">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <motion.div
  animate={{
    marginLeft: collapsed ? 96 : 280,
  }}
  transition={{
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative z-10"
>
        <Topbar />
        <main className="p-8 lg:p-10">{children}</main>
      </motion.div>
    </div>
  );
}

export default DashboardLayout;