import { Bell } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const DashboardHeader = () => {
  const {user} = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left Side */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {user.name}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-slate-800" />
          </button>

          {/* Profile */}
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <img src={user.photoURL} alt={user.name} className="h-full w-full object-cover"/>
            </div>

            {/* User Info */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-700">
                {user.name}
              </p>
            </div>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;