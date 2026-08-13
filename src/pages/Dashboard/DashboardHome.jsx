import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import DashboardStats from "../../components/Dashboard/DashboardStats";

const DashboardHome = () => {
  const recentReports = [
    {
      id: 1,
      name: "Black Backpack",
      status: "Found",
      date: "Aug 10, 2026",
      reportStatus: "Active",
    },
    {
      id: 2,
      name: "Black Wallet",
      status: "Lost",
      date: "Aug 08, 2026",
      reportStatus: "Active",
    },
    {
      id: 3,
      name: "Student ID Card",
      status: "Found",
      date: "Aug 05, 2026",
      reportStatus: "Recovered",
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      status: "Lost",
      date: "Aug 03, 2026",
      reportStatus: "Pending",
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
          Welcome back, Mayraj
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Here's an overview of your lost and found activity.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Recent Reports */}
      <section className="mt-8 rounded-xl border border-slate-200 bg-white">

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">

          <div>
            <h3 className="font-semibold text-slate-800">
              My Recent Reports
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Your recently reported items
            </p>
          </div>

          <Link
            to="/dashboard/reports"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            View All
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* Reports */}
        <div className="divide-y divide-slate-100">

          {recentReports.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >

              {/* Item */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  {item.name}
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  {item.date}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.status === "Lost"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {item.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.reportStatus === "Recovered"
                      ? "bg-slate-100 text-slate-700"
                      : item.reportStatus === "Pending"
                      ? "bg-slate-100 text-slate-500"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {item.reportStatus}
                </span>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default DashboardHome;