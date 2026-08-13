import { useState } from "react";
import {
  ClipboardCheck,
  Eye,
  CalendarDays,
} from "lucide-react";

const ClaimRequests = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Temporary data
  // Later this data will come from database
  const claimRequests = [
    {
      id: 1,
      itemName: "Black Backpack",
      category: "Bag",
      reporter: "Rahim Ahmed",
      date: "Aug 11, 2026",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 2,
      itemName: "Student ID Card",
      category: "ID Card",
      reporter: "Nusrat Jahan",
      date: "Aug 09, 2026",
      status: "Approved",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 3,
      itemName: "Silver Key",
      category: "Keys",
      reporter: "Tanvir Rahman",
      date: "Aug 08, 2026",
      status: "Rejected",
      image:
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: 4,
      itemName: "Blue Water Bottle",
      category: "Personal Item",
      reporter: "Mahin Chowdhury",
      date: "Aug 06, 2026",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filters = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
  ];

  const filteredRequests = claimRequests.filter((request) => {
    if (activeFilter === "All") {
      return true;
    }

    return request.status === activeFilter;
  });

  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <ClipboardCheck size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Claim Requests
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track the ownership claims you have submitted.
            </p>
          </div>

        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-slate-800 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Result Count */}
      <div className="mb-4">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredRequests.length}
          </span>{" "}
          {filteredRequests.length === 1
            ? "request"
            : "requests"}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">

        <div className="overflow-x-auto">
          <table className="w-full min-w-200">

            {/* Header */}
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Item
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Reporter
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Submitted
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-slate-100">

              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* Item */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <img
                        src={request.image}
                        alt={request.itemName}
                        className="h-11 w-11 rounded-lg object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {request.itemName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {request.category}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Reporter */}
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600">
                      {request.reporter}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={15} />
                      {request.date}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        request.status === "Approved"
                          ? "bg-slate-800 text-white"
                          : request.status === "Rejected"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      {/* Mobile List */}
      <div className="space-y-3 md:hidden">

        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >

            <div className="flex gap-3">

              <img
                src={request.image}
                alt={request.itemName}
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-2">

                  <div>
                    <h3 className="truncate text-sm font-semibold text-slate-700">
                      {request.itemName}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {request.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <Eye size={17} />
                  </button>

                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      request.status === "Approved"
                        ? "bg-slate-800 text-white"
                        : request.status === "Rejected"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {request.status}
                  </span>

                  <span className="text-xs text-slate-400">
                    {request.date}
                  </span>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

          <ClipboardCheck
            size={36}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No claim requests found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            You don't have any {activeFilter.toLowerCase()} claim requests.
          </p>

        </div>
      )}

    </div>
  );
};

export default ClaimRequests;