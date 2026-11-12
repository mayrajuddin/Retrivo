import { Bell, } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const AdminHeader = () => {
  const { user } = useAuth();
  console.log(user.email);
  

  return (
    <header className="hidden border-b border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center justify-between px-6 lg:px-8">

        {/* Left Side */}
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-800">
            Admin Dashboard
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Admin notifications"
          >
            <Bell size={20} strokeWidth={1.8} />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-slate-800" />
          </button>

          {/* Divider */}
          <div className="mx-1 h-8 w-px bg-slate-200" />

          {/* Admin Profile */}
          <Link
            to="/dashboard/admin/profile"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white">
              <img src={user.photoURL} alt={user.name} className="h-full w-full object-cover"/>
            </div>

            {/* Admin Info */}
            <div className="text-left">
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

export default AdminHeader;