import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  User,
  Mail,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedUser, setSelectedUser] = useState(null);

  const [users] = useState([
    {
      id: 1,
      name: "Rahim Ahmed",
      email: "rahim@example.com",
      role: "User",
      status: "Active",
      joinedDate: "Aug 05, 2026",
      reports: 4,
      claims: 2,
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      email: "nusrat@example.com",
      role: "User",
      status: "Active",
      joinedDate: "Aug 04, 2026",
      reports: 3,
      claims: 1,
    },
    {
      id: 3,
      name: "Sakib Hasan",
      email: "sakib@example.com",
      role: "User",
      status: "Active",
      joinedDate: "Aug 02, 2026",
      reports: 5,
      claims: 2,
    },
    {
      id: 4,
      name: "Tanvir Rahman",
      email: "tanvir@example.com",
      role: "User",
      status: "Suspended",
      joinedDate: "Jul 28, 2026",
      reports: 1,
      claims: 0,
    },
    {
      id: 5,
      name: "Afsana Karim",
      email: "afsana@example.com",
      role: "User",
      status: "Active",
      joinedDate: "Jul 25, 2026",
      reports: 2,
      claims: 1,
    },
    {
      id: 6,
      name: "Retrivo Admin",
      email: "admin@retrivo.com",
      role: "Admin",
      status: "Active",
      joinedDate: "Jul 20, 2026",
      reports: 0,
      claims: 0,
    },
  ]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-800">
          Users
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          View and manage registered users of Retrivo.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Role */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="All">All Roles</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>

          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-semibold text-slate-800">
              Registered Users
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {filteredUsers.length} users found
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">

                <th className="px-6 py-4 font-medium">
                  User
                </th>

                <th className="px-6 py-4 font-medium">
                  Role
                </th>

                <th className="px-6 py-4 font-medium">
                  Reports
                </th>

                <th className="px-6 py-4 font-medium">
                  Claims
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-medium">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <User size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {user.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {user.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Reports */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.reports}
                    </td>

                    {/* Claims */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {user.claims}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() => setSelectedUser(user)}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Eye size={15} />
                          View
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-slate-600">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 md:hidden">

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-5"
              >
                <div className="flex gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <User size={19} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700">
                          {user.name}
                        </h4>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.role}
                      </span>

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                      <div className="flex gap-4 text-xs text-slate-400">
                        <span>
                          Reports: {user.reports}
                        </span>

                        <span>
                          Claims: {user.claims}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                      >
                        <Eye size={15} />
                        View
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-sm font-medium text-slate-600">
                No users found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>
                <h3 className="font-semibold text-slate-800">
                  User Details
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Account information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-5 sm:p-6">

              {/* User Profile */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-white">
                  <User size={24} />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800">
                    {selectedUser.name}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {selectedUser.email}
                  </p>
                </div>

              </div>

              {/* Account Info */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck size={17} />

                    <p className="text-xs">
                      Role
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {selectedUser.role}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <User size={17} />

                    <p className="text-xs">
                      Account Status
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {selectedUser.status}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays size={17} />

                    <p className="text-xs">
                      Joined
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {selectedUser.joinedDate}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail size={17} />

                    <p className="text-xs">
                      Email
                    </p>
                  </div>

                  <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                    {selectedUser.email}
                  </p>
                </div>

              </div>

              {/* Activity Summary */}
              <div className="rounded-lg border border-slate-200 p-4">

                <p className="text-sm font-semibold text-slate-700">
                  Activity Summary
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-slate-400">
                      Reports Submitted
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {selectedUser.reports}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Claim Requests
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-800">
                      {selectedUser.claims}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-200 px-5 py-4 sm:px-6">

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Users;