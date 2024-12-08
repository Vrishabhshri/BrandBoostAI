import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"; // Ensure correct import
import SideBar from "./_components/SideBar";
import DashboardSidebar from "./_components/SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="pl-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
