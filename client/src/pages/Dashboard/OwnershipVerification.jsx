
import { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import {
  ShieldCheck,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Send,
  ArrowLeft,
  Clock,
  Palette,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const OwnershipVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const itemId = searchParams.get("item");

  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    itemColor: "",
    lostLocation: "",
    lostDate: "",
    lostTime: "",
    identifyingDetails: "",
    contactNumber: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch selected item from MongoDB
 useEffect(() => {
  if (!itemId) {
    return;
  }

  const controller = new AbortController();

  fetch(`${API_URL}/items/${itemId}`, {
    method: "GET",
    credentials: "include",
    signal: controller.signal,
  })
    .then(async (response) => {
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch item");
      }

      const item = result.item;

      if (!item) {
        throw new Error("Item not found");
      }

      setSelectedItem({
        ...item,
        id: item._id,
        name: item.title,
        image: item.item_image || "",
        category: item.category_id?.category_name || "Uncategorized",
        status:
          item.type?.charAt(0).toUpperCase() +
          item.type?.slice(1),
        date: item.report_date
          ? new Date(item.report_date).toLocaleDateString("en-GB")
          : "N/A",
      });
    })
    .catch((err) => {
      if (err.name !== "AbortError") {
        console.error("Fetch selected item error:", err);
        setError(err.message || "Failed to load item");
      }
    })
    .finally(() => {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    });

  return () => controller.abort();
}, [itemId]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedItem) {
      alert("No item selected.");
      return;
    }

    if (!user) {
      alert("Please log in before submitting a claim.");
      return;
    }

    if (selectedItem.type !== "found") {
      alert("You can only claim a found item.");
      return;
    }

    // Prevent claiming own report
    const reporterId =
      selectedItem.user_id?._id || selectedItem.user_id;

    if (String(reporterId) === String(user._id)) {
      alert("You cannot claim your own reported item.");
      return;
    }

    const contactNumber =
      formData.contactNumber.trim() || user.phone || "";

    if (
      !formData.itemColor.trim() ||
      !formData.lostLocation.trim() ||
      !formData.lostDate ||
      !formData.identifyingDetails.trim() ||
      !contactNumber.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate Bangladesh mobile number
    const phoneNumber = contactNumber.replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+?8801|01)[3-9]\d{8}$/;

    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid Bangladesh mobile number.");
      return;
    }

    // Prevent future lost date
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const selectedDate = new Date(`${formData.lostDate}T00:00:00`);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate > today
    ) {
      alert("Please select a valid date. Future dates are not allowed.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const ownershipDetails = [
        `Lost location: ${formData.lostLocation.trim()}`,
        formData.additionalInfo.trim()
          ? `Additional information: ${formData.additionalInfo.trim()}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch(`${API_URL}/claims`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: selectedItem._id,
          item_color: formData.itemColor.trim(),
          lost_location: formData.lostLocation.trim(),
          lost_date: formData.lostDate,
          lost_time: formData.lostTime,
          unique_feature: formData.identifyingDetails.trim(),
          ownership_details: ownershipDetails,
          phone: phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit claim");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Claim submission error:", err);
      setError(err.message || "Unable to submit claim. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-16 text-center">
        <span className="loading loading-spinner loading-lg text-slate-600"></span>
        <p className="mt-3 text-sm text-slate-500">
          Loading item details...
        </p>
      </div>
    );
  }

  // No item selected or item not found
  if (!itemId || !selectedItem) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <ShieldCheck size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            {error ? "Unable to Load Item" : "No Item Selected"}
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {error ||
              'Please select a found item first and then choose "Verify Ownership".'}
          </p>

          <button
            type="button"
            onClick={() => navigate("/browse-items")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft size={16} />
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  const reporterId =
    selectedItem.user_id?._id || selectedItem.user_id;

  const isOwnReport =
    String(reporterId) === String(user?._id);

  // Only found items can be claimed
  if (selectedItem.type !== "found" || isOwnReport) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
          <ShieldCheck size={30} className="mx-auto text-slate-400" />

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            Claim Not Available
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {isOwnReport
              ? "You cannot submit an ownership claim for your own reported item."
              : "Ownership claims are only available for found items."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/browse-items")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft size={16} />
            Browse Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Ownership Verification
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Provide details to verify that this item belongs to you.
            </p>
          </div>
        </div>
      </div>

      {/* SELECTED ITEM */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Item You Want to Claim
        </p>

        <div className="flex gap-4">
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-800">
              {selectedItem.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Category: {selectedItem.category}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-white">
                {selectedItem.status}
              </span>

              <span className="text-xs text-slate-400">
                Reported: {selectedItem.date}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMATION NOTICE */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-slate-600" />

          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              Why is verification required?
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              These details help the item reporter confirm that you are
              the rightful owner. Please provide accurate information
              that can help identify your belongings.
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-700">
                Claim request submitted
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your ownership claim for{" "}
                <span className="font-medium text-slate-700">
                  {selectedItem.name}
                </span>{" "}
                has been submitted successfully. The item reporter will
                review your request.
              </p>

              <button
                type="button"
                onClick={() => navigate("/dashboard/claims")}
                className="mt-3 text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
              >
                View Claim Requests
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERIFICATION FORM */}
      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white"
        >
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <h2 className="font-semibold text-slate-800">
              Verification Details
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Provide information that can help prove your ownership.
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            {/* ITEM COLOR */}
            <div>
              <label
                htmlFor="itemColor"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Palette size={16} />
                Item Color
              </label>

              <input
                id="itemColor"
                name="itemColor"
                type="text"
                value={formData.itemColor}
                onChange={handleChange}
                placeholder="e.g. Black, Blue, Red"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />
            </div>

            {/* LOST LOCATION */}
            <div>
              <label
                htmlFor="lostLocation"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <MapPin size={16} />
                Where did you lose it?
              </label>

              <input
                id="lostLocation"
                name="lostLocation"
                type="text"
                value={formData.lostLocation}
                onChange={handleChange}
                placeholder="e.g. Central Library, Cafeteria"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />
            </div>

            {/* DATE + TIME */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="lostDate"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <CalendarDays size={16} />
                  Approximate Date
                </label>

                <input
                  id="lostDate"
                  name="lostDate"
                  type="date"
                  max={new Date().toLocaleDateString("en-CA")}
                  value={formData.lostDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
                />
              </div>

              <div>
                <label
                  htmlFor="lostTime"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <Clock size={16} />
                  Approximate Time
                </label>

                <input
                  id="lostTime"
                  name="lostTime"
                  type="time"
                  value={formData.lostTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
                />
              </div>
            </div>

            {/* IDENTIFYING DETAILS */}
            <div>
              <label
                htmlFor="identifyingDetails"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <FileText size={16} />
                Identifying Details
              </label>

              <textarea
                id="identifyingDetails"
                name="identifyingDetails"
                value={formData.identifyingDetails}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Describe unique details that can prove this item belongs to you. For example: scratches, stickers, unique marks, contents, serial number, case color, etc."
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Avoid sharing unnecessary sensitive information.
              </p>
            </div>

            {/* CONTACT NUMBER */}
            <div>
              <label
                htmlFor="contactNumber"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Phone size={16} />
                Contact Number
              </label>

              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber || user?.phone || ""}
                onChange={handleChange}
                placeholder="e.g. 01XXXXXXXXX"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                The item reporter may contact you using this number.
              </p>
            </div>

            {/* ADDITIONAL INFORMATION */}
            <div>
              <label
                htmlFor="additionalInfo"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Additional Information
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows="4"
                placeholder="Anything else that may help verify your ownership..."
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />
            </div>
          </div>

          {/* FORM FOOTER */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Verification
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {error && !submitted && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default OwnershipVerification;