import { useState } from "react";
import { FileText, Eye, CalendarDays } from "lucide-react";
import ItemsDetailsModal from "../../components/Home/ItemsDetailsModal";
const MyReports = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Temporary data
  // Later this data will come from database/API
  const myReports = [
    {
      id: 1,
      name: "Black Backpack",
      category: "Bag",
      date: "Aug 10, 2026",
      status: "Found",
      reportStatus: "Active",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Black Wallet",
      category: "Wallet",
      date: "Aug 08, 2026",
      status: "Lost",
      reportStatus: "Active",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Student ID Card",
      category: "ID Card",
      date: "Aug 05, 2026",
      status: "Found",
      reportStatus: "Recovered",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Wireless Earbuds",
      category: "Electronics",
      date: "Aug 03, 2026",
      status: "Lost",
      reportStatus: "Pending",
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filters = ["All", "Lost", "Found", "Recovered"];

  const filteredReports = myReports.filter((item) => {
    if (activeFilter === "All") {
      return true;
    }

    if (activeFilter === "Recovered") {
      return item.reportStatus === "Recovered";
    }

    return item.status === activeFilter;
  });
  
  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <FileText size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Reports</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage the items you have reported.
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
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredReports.length}
          </span>{" "}
          {filteredReports.length === 1 ? "report" : "reports"}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5">
            {/* Table Header */}
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Item
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer transition hover:bg-slate-50"
                >
                  {/* Item */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-11 w-11 rounded-lg object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Lost"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={15} />
                      {item.date}
                    </div>
                  </td>

                  {/* Report Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.reportStatus === "Recovered"
                          ? "bg-slate-800 text-white"
                          : item.reportStatus === "Pending"
                            ? "bg-slate-100 text-slate-500"
                            : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {item.reportStatus}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
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
        {filteredReports.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
          >
            <div className="flex gap-3">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />

              {/* Item Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="truncate text-sm font-semibold text-slate-700">
                      {item.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {item.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  >
                    <Eye size={17} />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.status === "Lost"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {item.status}
                  </span>

                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                    {item.reportStatus}
                  </span>

                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <FileText size={36} className="mx-auto text-slate-300" />

          <h3 className="mt-4 font-semibold text-slate-700">
            No reports found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            You don't have any {activeFilter.toLowerCase()} reports yet.
          </p>
        </div>
      )}
      {selectedItem && (
        <ItemsDetailsModal
          selectedItem={selectedItem}
          closeModal={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default MyReports;
