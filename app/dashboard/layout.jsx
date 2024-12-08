import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"; // Ensure correct import
import SideBar from "./_components/SideBar";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:ml-64 z-50">{children}</div>
      <SidebarProvider>
        <SideBar />
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
