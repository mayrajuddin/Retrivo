import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  X,
  Check,
  User,
  Package,
  CalendarDays,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const ClaimsVerification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedClaim, setSelectedClaim] = useState(null);

  const [claims, setClaims] = useState([
    {
      id: 1,
      itemName: "Black Backpack",
      category: "Bag",
      itemStatus: "Found",
      claimant: "Sakib Hasan",
      email: "sakib@example.com",
      phone: "017XXXXXXXX",
      claimDate: "Aug 20, 2026",
      foundLocation: "Central Library - 2nd Floor",
      status: "Pending",
      proof: {
        color: "Black",
        brand: "Unknown",
        uniqueFeature:
          "Small blue keychain attached to the side.",
        contents:
          "Two academic books and a calculator.",
      },
    },
    {
      id: 2,
      itemName: "Student ID Card",
      category: "ID Card",
      itemStatus: "Found",
      claimant: "Nusrat Jahan",
      email: "nusrat@example.com",
      phone: "018XXXXXXXX",
      claimDate: "Aug 19, 2026",
      foundLocation: "Cafeteria - Ground Floor",
      status: "Approved",
      proof: {
        color: "White",
        brand: "University",
        uniqueFeature:
          "Student ID number and personal information matched.",
        contents: "University student ID card.",
      },
    },
    {
      id: 3,
      itemName: "Black Wallet",
      category: "Wallet",
      itemStatus: "Found",
      claimant: "Rahim Ahmed",
      email: "rahim@example.com",
      phone: "019XXXXXXXX",
      claimDate: "Aug 18, 2026",
      foundLocation: "Academic Building - Room 204",
      status: "Pending",
      proof: {
        color: "Black",
        brand: "Leather",
        uniqueFeature:
          "Small scratch on the front-right corner.",
        contents:
          "Student card, driving license and several cards.",
      },
    },
    {
      id: 4,
      itemName: "Wireless Earbuds",
      category: "Electronics",
      itemStatus: "Found",
      claimant: "Afsana Karim",
      email: "afsana@example.com",
      phone: "016XXXXXXXX",
      claimDate: "Aug 17, 2026",
      foundLocation: "Computer Lab - 3rd Floor",
      status: "Rejected",
      proof: {
        color: "White",
        brand: "Unknown",
        uniqueFeature:
          "Claimant could not provide matching details.",
        contents: "Wireless earbuds with charging case.",
      },
    },
  ]);

  // Filter claims
  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesSearch =
        claim.itemName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        claim.claimant
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        claim.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, searchTerm, statusFilter]);

  // Update claim status
  const updateClaimStatus = (id, newStatus) => {
    setClaims((previousClaims) =>
      previousClaims.map((claim) =>
        claim.id === id
          ? {
              ...claim,
              status: newStatus,
            }
          : claim
      )
    );

    setSelectedClaim((previousClaim) =>
      previousClaim
        ? {
            ...previousClaim,
            status: newStatus,
          }
        : previousClaim
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
          Claim Requests
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review ownership claims and verify item ownership.
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
              placeholder="Search item or claimant..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
            />

          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>
      </div>

      {/* Claims Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

          <div>
            <h3 className="font-semibold text-slate-800">
              Ownership Claims
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {filteredClaims.length} claims found
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
                  Claimant
                </th>

                <th className="px-6 py-4 font-medium">
                  Claim Date
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

              {filteredClaims.length > 0 ? (
                filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Item */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <Package size={18} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {claim.itemName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {claim.category}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Claimant */}
                    <td className="px-6 py-4">

                      <p className="text-sm font-medium text-slate-700">
                        {claim.claimant}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {claim.email}
                      </p>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {claim.claimDate}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          claim.status === "Approved"
                            ? "bg-slate-800 text-white"
                            : claim.status === "Rejected"
                            ? "bg-slate-100 text-slate-400"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {claim.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedClaim(claim)
                          }
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Eye size={15} />
                          Review
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-slate-600">
                      No claim requests found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 md:hidden">

          {filteredClaims.length > 0 ? (
            filteredClaims.map((claim) => (
              <div
                key={claim.id}
                className="p-5"
              >

                <div className="flex gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Package size={19} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700">
                          {claim.itemName}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          Claimed by {claim.claimant}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          claim.status === "Approved"
                            ? "bg-slate-800 text-white"
                            : claim.status === "Rejected"
                            ? "bg-slate-100 text-slate-400"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {claim.status}
                      </span>

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                      <span className="text-xs text-slate-400">
                        {claim.claimDate}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedClaim(claim)
                        }
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                      >
                        <Eye size={15} />
                        Review
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-sm font-medium text-slate-600">
                No claim requests found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Claim Review Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">

          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

              <div>

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={19}
                    className="text-slate-500"
                  />

                  <h3 className="font-semibold text-slate-800">
                    Ownership Verification
                  </h3>

                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Review the claimant's ownership information.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedClaim(null)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto">

              <div className="space-y-6 p-5 sm:p-6">

                {/* Item Information */}
                <div>

                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Item Information
                  </p>

                  <div className="rounded-xl border border-slate-200 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Package size={19} />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">
                          {selectedClaim.itemName}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          {selectedClaim.category} ·{" "}
                          {selectedClaim.itemStatus}
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 flex items-start gap-3">

                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Found Location
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {selectedClaim.foundLocation}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Claimant Information */}
                <div>

                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Claimant Information
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="flex gap-3 rounded-lg bg-slate-50 p-4">

                      <User
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Name
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {selectedClaim.claimant}
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3 rounded-lg bg-slate-50 p-4">

                      <Phone
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Contact Number
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {selectedClaim.phone}
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3 rounded-lg bg-slate-50 p-4">

                      <CalendarDays
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />

                      <div>
                        <p className="text-xs text-slate-400">
                          Claim Date
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {selectedClaim.claimDate}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Ownership Proof */}
                <div>

                  <div className="mb-3 flex items-center gap-2">

                    <ShieldCheck
                      size={18}
                      className="text-slate-500"
                    />

                    <p className="text-sm font-semibold text-slate-700">
                      Ownership Proof
                    </p>

                  </div>

                  <div className="space-y-3 rounded-xl border border-slate-200 p-4">

                    <div>
                      <p className="text-xs text-slate-400">
                        Item Color
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedClaim.proof.color}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Brand
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedClaim.proof.brand}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Unique Feature
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {selectedClaim.proof.uniqueFeature}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Item Contents
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {selectedClaim.proof.contents}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Verification Note */}
                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-xs font-semibold text-slate-600">
                    Admin Verification Note
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Compare the claimant's information with the
                    original report before approving the claim.
                    If the information does not match, reject the
                    request.
                  </p>

                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

              <button
                type="button"
                onClick={() =>
                  setSelectedClaim(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>

              {selectedClaim.status === "Pending" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      updateClaimStatus(
                        selectedClaim.id,
                        "Rejected"
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <X size={17} />
                    Reject Claim
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateClaimStatus(
                        selectedClaim.id,
                        "Approved"
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    <Check size={17} />
                    Approve Claim
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

export default ClaimsVerification;