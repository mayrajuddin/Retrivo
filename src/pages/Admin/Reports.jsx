import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  User,
  Package,
} from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Black Backpack",
      category: "Bag",
      type: "Found",
      location: "Campus Area",
      exactLocation: "Central Library - 2nd Floor",
      date: "Aug 20, 2026",
      reporter: "Rahim Ahmed",
      reporterEmail: "rahim@example.com",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      description:
        "A black backpack with a small blue keychain attached to the side. The bag contains some books and personal belongings.",
    },
    {
      id: 2,
      name: "Student ID Card",
      category: "ID Card",
      type: "Lost",
      location: "Campus Area",
      exactLocation: "Cafeteria - Ground Floor",
      date: "Aug 19, 2026",
      reporter: "Nusrat Jahan",
      reporterEmail: "nusrat@example.com",
      status: "Approved",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      description: "A student identification card was lost on campus.",
    },
    {
      id: 3,
      name: "Black Wallet",
      category: "Wallet",
      type: "Lost",
      location: "Campus Area",
      exactLocation: "Academic Building - Room 204",
      date: "Aug 18, 2026",
      reporter: "Sakib Hasan",
      reporterEmail: "sakib@example.com",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      description:
        "A black leather wallet that was lost somewhere around the academic building.",
    },
    {
      id: 4,
      name: "Silver Key",
      category: "Keys",
      type: "Found",
      location: "Campus Area",
      exactLocation: "Main Gate Waiting Area",
      date: "Aug 17, 2026",
      reporter: "Tanvir Rahman",
      reporterEmail: "tanvir@example.com",
      status: "Rejected",
      image:
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
      description: "A silver key found near the campus entrance.",
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      category: "Electronics",
      type: "Lost",
      location: "Campus Area",
      exactLocation: "Computer Lab - 3rd Floor",
      date: "Aug 16, 2026",
      reporter: "Afsana Karim",
      reporterEmail: "afsana@example.com",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
      description: "Wireless earbuds in a small charging case.",
    },
    {
      id: 6,
      name: "Blue Water Bottle",
      category: "Personal Item",
      type: "Found",
      location: "Campus Area",
      exactLocation: "Sports Ground",
      date: "Aug 15, 2026",
      reporter: "Mahin Chowdhury",
      reporterEmail: "mahin@example.com",
      status: "Approved",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      description: "A blue reusable water bottle found on campus.",
    },
  ]);

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "All" || report.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, searchTerm, typeFilter, statusFilter]);

  // Update report status
  const updateStatus = (id, newStatus) => {
    setReports((previousReports) =>
      previousReports.map((report) =>
        report.id === id
          ? { ...report, status: newStatus }
          : report
      )
    );

    setSelectedReport((previousReport) =>
      previousReport
        ? { ...previousReport, status: newStatus }
        : previousReport
    );
  };

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-800">
          Reports
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review and manage lost and found item reports.
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
              placeholder="Search item, category or reporter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Type */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={17}
                className="text-slate-400"
              />

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="pr-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
              >
                <option value="All" className="">All Types</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-semibold text-slate-800">
              All Reports
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {filteredReports.length} reports found
            </p>
          </div>
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

                <th className="px-6 py-4 text-right font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Item */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <img
                          src={report.image}
                          alt={report.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {report.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {report.category}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Type */}
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

                    {/* Reporter */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {report.reporter}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {report.date}
                    </td>

                    {/* Status */}
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

                    {/* Action */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() => setSelectedReport(report)}
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
                      No reports found
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

          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-5"
              >
                <div className="flex gap-3">

                  <img
                    src={report.image}
                    alt={report.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700">
                          {report.name}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          {report.category}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          report.type === "Lost"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-slate-800 text-white"
                        }`}
                      >
                        {report.type}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Reported by {report.reporter}
                    </p>

                    <div className="mt-3 flex items-center justify-between">

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          report.status === "Approved"
                            ? "bg-slate-800 text-white"
                            : report.status === "Rejected"
                            ? "bg-slate-100 text-slate-400"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {report.status}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
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
                No reports found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">

          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>
                <h3 className="font-semibold text-slate-800">
                  Report Details
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Review this report before taking action.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto">

              {/* Image */}
              <div className="bg-slate-50 p-5 sm:p-6">
                <img
                  src={selectedReport.image}
                  alt={selectedReport.name}
                  className="mx-auto h-52 w-full max-w-md rounded-xl object-cover"
                />
              </div>

              <div className="space-y-6 p-5 sm:p-6">

                {/* Item Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">

                    <h4 className="text-xl font-bold text-slate-800">
                      {selectedReport.name}
                    </h4>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        selectedReport.type === "Lost"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {selectedReport.type}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {selectedReport.category}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="flex gap-3">
                    <User
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Reporter
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedReport.reporter}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Report Date
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedReport.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedReport.exactLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Package
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Current Status
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedReport.status}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Description */}
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {selectedReport.description}
                  </p>
                </div>

                {/* Reporter Email */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Reporter Email
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedReport.reporterEmail}
                  </p>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>

              {selectedReport.status === "Pending" && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      updateStatus(selectedReport.id, "Rejected");
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <X size={17} />
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateStatus(selectedReport.id, "Approved");
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    <Check size={17} />
                    Approve
                  </button>
                </>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Reports;