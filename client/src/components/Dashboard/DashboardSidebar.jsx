import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  User,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Report item",
      path: "/dashboard/report-item",
      icon: FileText,
    },
    {
      name: "My Reports",
      path: "/dashboard/reports",
      icon: FileText,
    },
    {
      name: "Claim Requests",
      path: "/dashboard/claims",
      icon: ClipboardCheck,
    },
    {
      name: "Ownership Verification",
      path: "/dashboard/verification",
      icon: ShieldCheck,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold tracking-tight text-slate-800"
          >
            Retrivo
          </NavLink>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close dashboard menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dashboard
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut size={19} strokeWidth={1.8} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;