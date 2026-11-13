
import { useEffect, useMemo, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch all reports from database
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_URL}/items/admin/reports`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reports");
      }

      setReports(data.reports || []);
      setError("");
    } catch (err) {
      console.error("Fetch reports error:", err);
      setError(err.message || "Unable to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const loadReports = async () => {
    await fetchReports();
  };

  loadReports();
}, []);

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status label
  const getStatusLabel = (status) => {
    if (!status) return "Pending";

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Filter reports
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const itemName = report.title || "";
      const category = report.category_id?.category_name || "";
      const reporter = report.user_id?.name || "";

      const matchesSearch =
        itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporter.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "All" ||
        report.type === typeFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "All" ||
        report.approvalStatus === statusFilter.toLowerCase();

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, searchTerm, typeFilter, statusFilter]);

  // Approve or reject report
  const updateStatus = async (reportId, newStatus) => {
    try {
      setUpdating(true);

      const response = await fetch(
        `${API_URL}/items/admin/reports/${reportId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            approvalStatus: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update report");
      }

      // Update reports list
      setReports((previousReports) =>
        previousReports.map((report) =>
          report._id === reportId
            ? { ...report, approvalStatus: newStatus }
            : report
        )
      );

      // Update selected report in modal
      setSelectedReport((previousReport) =>
        previousReport
          ? { ...previousReport, approvalStatus: newStatus }
          : null
      );
    } catch (err) {
      console.error("Update report error:", err);
      alert(err.message || "Unable to update report status");
    } finally {
      setUpdating(false);
    }
  };

  // Status badge style
  const getStatusStyle = (status) => {
    if (status === "approved") {
      return "bg-slate-800 text-white";
    }

    if (status === "rejected") {
      return "bg-slate-100 text-slate-400";
    }

    return "bg-slate-100 text-slate-600";
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-slate-700"></span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-800">
          Manage Reports
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review submitted lost and found item reports.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchReports();
            }}
            className="mt-2 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

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
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-7 text-sm text-slate-600 outline-none focus:border-slate-400"
              >
                <option value="All">All Types</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-6 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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
              All Submitted Reports
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
                <th className="px-6 py-4 font-medium">Item</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Reporter</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr
                    key={report._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Item */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={report.item_image || "https://placehold.co/80x80?text=No+Image"}
                          alt={report.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {report.title}
                          </p>

                          <p className="text-xs text-slate-400">
                            {report.category_id?.category_name || "Uncategorized"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          report.type === "lost"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-slate-800 text-white"
                        }`}
                      >
                        {getStatusLabel(report.type)}
                      </span>
                    </td>

                    {/* Reporter */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {report.user_id?.name || "Unknown"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDate(report.report_date)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          report.approvalStatus
                        )}`}
                      >
                        {getStatusLabel(report.approvalStatus)}
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
                  <td colSpan="6" className="px-6 py-12 text-center">
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
              <div key={report._id} className="p-5">
                <div className="flex gap-3">
                  <img
                    src={report.item_image || "https://placehold.co/80x80?text=No+Image"}
                    alt={report.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700">
                          {report.title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          {report.category_id?.category_name || "Uncategorized"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          report.type === "lost"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-slate-800 text-white"
                        }`}
                      >
                        {getStatusLabel(report.type)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Reported by {report.user_id?.name || "Unknown"}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          report.approvalStatus
                        )}`}
                      >
                        {getStatusLabel(report.approvalStatus)}
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
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto">
              {/* Image */}
              <div className="bg-slate-50 p-5 sm:p-6">
                <img
                  src={
                    selectedReport.item_image ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={selectedReport.title}
                  className="mx-auto h-52 w-full max-w-md rounded-xl object-cover"
                />
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                {/* Item Info */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xl font-bold text-slate-800">
                      {selectedReport.title}
                    </h4>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        selectedReport.type === "lost"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {getStatusLabel(selectedReport.type)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {selectedReport.category_id?.category_name || "Uncategorized"}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <User size={18} className="mt-0.5 shrink-0 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-400">Reporter</p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedReport.user_id?.name || "Unknown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">Report Date</p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {formatDate(selectedReport.report_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedReport.exact_location ||
                          selectedReport.location ||
                          "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Package size={18} className="mt-0.5 shrink-0 text-slate-400" />

                    <div>
                      <p className="text-xs text-slate-400">
                        Approval Status
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getStatusLabel(selectedReport.approvalStatus)}
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

                {/* Reporter Contact */}
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Reporter Email</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedReport.user_id?.email || "N/A"}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    Contact Number
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedReport.contact_number || "N/A"}
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

              {selectedReport.approvalStatus === "pending" && (
                <>
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() =>
                      updateStatus(selectedReport._id, "rejected")
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={17} />
                    {updating ? "Updating..." : "Reject"}
                  </button>

                  <button
                    type="button"
                    disabled={updating}
                    onClick={() =>
                      updateStatus(selectedReport._id, "approved")
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check size={17} />
                    {updating ? "Updating..." : "Approve"}
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

export default ManageReports;
