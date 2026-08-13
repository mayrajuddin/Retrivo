import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router";

import DashboardSidebar from "../../components/Dashboard/DashboardSidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Area */}
      <div className="lg:ml-72">

        {/* Mobile Header */}
        <div className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Open dashboard menu"
          >
            <Menu size={22} />
          </button>

          <span className="ml-3 text-lg font-semibold text-slate-800">
            Dashboard
          </span>
        </div>
        {/* Dashboard Header */}
        <DashboardHeader />
        {/* Page Content */}
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;