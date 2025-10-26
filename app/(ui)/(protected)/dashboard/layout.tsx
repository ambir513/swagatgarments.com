import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import React from "react";
import { Toaster } from "react-hot-toast";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <AppSidebar />
      <main className="w-full">
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
