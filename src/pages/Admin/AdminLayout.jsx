import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="lg:ml-72">

        {/* Mobile Header */}
        <div className="flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Open admin menu"
          >
            <Menu size={22} />
          </button>

          <div className="ml-3">
            <p className="text-lg font-semibold text-slate-800">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Admin Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-9rem)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;