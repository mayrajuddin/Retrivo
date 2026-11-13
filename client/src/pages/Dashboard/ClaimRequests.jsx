import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Eye,
  CalendarDays,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ClaimRequests = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claimRequests, setClaimRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = ["All", "Pending", "Approved", "Rejected"];

  // Fetch logged-in user's claims from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/claims/my-claims`, {
      method: "GET",
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch claim requests");
        }

        return data;
      })
      .then((data) => {
        const claims = (data.claims || []).map((claim) => {
          const item = claim.item_id || {};

          return {
            id: claim._id,
            itemName: item.title || "Unknown Item",
            image: item.item_image || "",
            category:
              item.category_id?.category_name || "Uncategorized",
            claimantName: claim.user_id?.name || "You",
            contactNumber: claim.phone || "",
            itemColor: claim.item_color || "",
            lostLocation: claim.lost_location || "",
            lostDate: claim.lost_date
              ? new Date(claim.lost_date).toLocaleDateString()
              : "",
            lostTime: claim.lost_time || "",
            identifyingDetails: claim.unique_feature || "",
            additionalInfo: claim.ownership_details || "",
            submittedAt: claim.claim_date,
            status:
              claim.status?.charAt(0).toUpperCase() +
              claim.status?.slice(1),
          };
        });

        setClaimRequests(claims);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch claim requests error:", error);
          setError(error.message || "Failed to load claim requests");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const filteredRequests = claimRequests.filter((request) => {
    if (activeFilter === "All") return true;
    return request.status === activeFilter;
  });

  // Open claim details
  const handleView = (request) => {
    setSelectedClaim(request);
  };

  const statusClass = (status) =>
    status === "Approved"
      ? "bg-slate-800 text-white"
      : status === "Rejected"
        ? "bg-slate-100 text-slate-500"
        : "bg-slate-50 text-slate-600";

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

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
          <span className="loading loading-spinner loading-md text-slate-600"></span>
          <p className="mt-3 text-sm text-slate-500">
            Loading claim requests...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Result Count */}
          <div className="mb-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredRequests.length}
              </span>{" "}
              {filteredRequests.length === 1 ? "request" : "requests"}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Item
                    </th>

                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Claimant
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

                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              request.image ||
                              "https://placehold.co/100x100?text=No+Image"
                            }
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

                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-600">
                          {request.claimantName}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays size={15} />
                          {request.submittedAt
                            ? new Date(
                                request.submittedAt,
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleView(request)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </div>
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
                    src={
                      request.image ||
                      "https://placehold.co/100x100?text=No+Image"
                    }
                    alt={request.itemName}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-700">
                      {request.itemName}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {request.category}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(request.status)}`}
                      >
                        {request.status}
                      </span>

                      <span className="text-xs text-slate-400">
                        {request.submittedAt
                          ? new Date(
                              request.submittedAt,
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => handleView(request)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    <Eye size={14} />
                    View Details
                  </button>
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
                You don't have any {activeFilter.toLowerCase()} claim
                requests.
              </p>
            </div>
          )}
        </>
      )}

      {/* Claim Details Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Claim Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {selectedClaim.itemName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {selectedClaim.image && (
                <img
                  src={selectedClaim.image}
                  alt={selectedClaim.itemName}
                  className="mb-5 h-48 w-full rounded-xl object-cover"
                />
              )}

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-400">Item Name</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedClaim.itemName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Category</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedClaim.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Claimant</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.claimantName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Contact Number</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.contactNumber || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Item Color</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.itemColor || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Lost Location</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.lostLocation || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Lost Date</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.lostDate || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Lost Time</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.lostTime || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Submitted At</p>
                    <p className="mt-1 text-sm text-slate-700">
                      {selectedClaim.submittedAt
                        ? new Date(
                            selectedClaim.submittedAt,
                          ).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Status</p>
                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${statusClass(selectedClaim.status)}`}
                    >
                      {selectedClaim.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Identifying Details
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                    {selectedClaim.identifyingDetails || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Additional Information
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                    {selectedClaim.additionalInfo || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimRequests;