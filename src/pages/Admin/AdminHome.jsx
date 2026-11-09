import { Link } from "react-router";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

import AdminStats from "../../components/Admin/AdminStats";

const AdminHome = () => {
  const pendingActions = [
    {
      title: "Reports waiting for review",
      count: 12,
      icon: FileText,
      path: "/dashboard/admin/reports",
    },
    {
      title: "Ownership requests pending",
      count: 8,
      icon: ShieldCheck,
      path: "/dashboard/admin/claims",
    },
    {
      title: "New registered users",
      count: 5,
      icon: Users,
      path: "/dashboard/admin/users",
    },
  ];

  const recentReports = [
    {
      id: 1,
      item: "Black Backpack",
      type: "Found",
      reporter: "Rahim Ahmed",
      date: "Aug 20, 2026",
      status: "Pending",
    },
    {
      id: 2,
      item: "Student ID Card",
      type: "Lost",
      reporter: "Nusrat Jahan",
      date: "Aug 19, 2026",
      status: "Approved",
    },
    {
      id: 3,
      item: "Silver Key",
      type: "Found",
      reporter: "Tanvir Rahman",
      date: "Aug 18, 2026",
      status: "Pending",
    },
    {
      id: 4,
      item: "Wireless Earbuds",
      type: "Lost",
      reporter: "Afsana Karim",
      date: "Aug 17, 2026",
      status: "Rejected",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Intro */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Overview
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-800">
          Welcome to Retrivo Admin
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Manage users, reports and ownership verification from here.
        </p>
      </div>

      {/* Statistics */}
      <AdminStats />

      {/* Pending Actions */}
      <section className="mt-8">

        <div className="mb-4">
          <h3 className="font-semibold text-slate-800">
            Pending Actions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Tasks that may require your attention.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {pendingActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.path}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {action.title}
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-800">
                        {action.count}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700"
                  />

                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Reports */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">

          <div>
            <h3 className="font-semibold text-slate-800">
              Recent Reports
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Latest lost and found reports
            </p>
          </div>

          <Link
            to="/dashboard/admin/reports"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            View All
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4 font-medium">
                  Item
                </th>

                <th className="px-6 py-4 font-medium">
                  Type
                </th>

                <th className="px-6 py-4 font-medium">
                  Reporter
                </th>

                <th className="px-6 py-4 font-medium">
                  Date
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">
                    {report.item}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        report.type === "Lost"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {report.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {report.reporter}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {report.date}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        report.status === "Approved"
                          ? "bg-slate-800 text-white"
                          : report.status === "Rejected"
                          ? "bg-slate-100 text-slate-400"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Mobile List */}
        <div className="divide-y divide-slate-100 md:hidden">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="px-5 py-4"
            >
              <div className="flex items-start justify-between gap-3">

                <div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    {report.item}
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    {report.reporter}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {report.date}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      report.type === "Lost"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {report.type}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {report.status}
                  </span>

                </div>

              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default AdminHome;