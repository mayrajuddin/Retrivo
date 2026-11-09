import { getCurrentUser } from "../../utils/authUser";
import {
  getStoredClaims,
  saveStoredClaims,
} from "../../utils/claimStorage";
import { useState } from "react";
import {
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router";

import {
  ShieldCheck,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Send,
  ArrowLeft,
  Clock,
} from "lucide-react";

const OwnershipVerification = () => {
  const navigate = useNavigate();

  // Get all items from Root loader
  const items = useRouteLoaderData("dash");

  // Get item ID from URL
  const [searchParams] = useSearchParams();

  const itemId = searchParams.get("item");

  // Find selected item
  const selectedItem = items?.find(
  (item) => String(item.id) === String(itemId)
);

  const [formData, setFormData] = useState({
    lostLocation: "",
    lostDate: "",
    lostTime: "",
    identifyingDetails: "",
    contactNumber: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle form submission

const handleSubmit = (event) => {
  event.preventDefault();

  if (!selectedItem) {
    alert("No item selected.");
    return;
  }

  if (selectedItem.status !== "Found") {
    alert("You can only claim a found item.");
    return;
  }

  const currentUser = getCurrentUser();

  if (!currentUser?.email) {
    alert("Please log in before submitting a claim.");
    return;
  }

  // Validate required text fields
  if (
    !formData.lostLocation.trim() ||
    !formData.identifyingDetails.trim() ||
    !formData.contactNumber.trim()
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Validate Bangladesh mobile number
  const phoneNumber = formData.contactNumber.replace(/[\s-]/g, "");
  const phoneRegex = /^(?:\+?8801|01)[3-9]\d{8}$/;

  if (!phoneRegex.test(phoneNumber)) {
    alert("Please enter a valid Bangladesh mobile number.");
    return;
  }

  // Prevent future lost date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${formData.lostDate}T00:00:00`);

  if (!formData.lostDate || selectedDate > today) {
    alert("Please select a valid date. Future dates are not allowed.");
    return;
  }

  try {
    const existingClaims = getStoredClaims();

    // Check for an existing pending claim
    const duplicateClaim = existingClaims.find(
      (claim) =>
        String(claim.itemId) === String(selectedItem.id) &&
        claim.claimantEmail === currentUser.email &&
        String(claim.status).toLowerCase() === "pending",
    );

    if (duplicateClaim) {
      alert(
        "You have already submitted a pending claim for this item. Please wait for the admin to review it.",
      );
      return;
    }

    // Create new claim request
    const newClaim = {
      id: Date.now(),

      itemId: selectedItem.id,
      itemName: selectedItem.name,
      category: selectedItem.category,
      image: selectedItem.image,

      claimantName: currentUser.name || "",
      claimantEmail: currentUser.email,

      lostLocation: formData.lostLocation.trim(),
      lostDate: formData.lostDate,
      lostTime: formData.lostTime,
      identifyingDetails: formData.identifyingDetails.trim(),
      contactNumber: formData.contactNumber.trim(),
      additionalInfo: formData.additionalInfo.trim(),

      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    // Save claim request
    const updatedClaims = [newClaim, ...existingClaims];

    saveStoredClaims(updatedClaims);

    setSubmitted(true);

    console.log("Claim submitted:", newClaim);
  } catch (error) {
    console.error("Claim submission failed:", error);

    alert(
      "Unable to submit your verification request. Please try again.",
    );
  }
};



  // -----------------------------------------
  // No item selected
  // -----------------------------------------

  if (!itemId || !selectedItem) {
    return (
      <div className="mx-auto max-w-3xl">

        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <ShieldCheck size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            No Item Selected
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Please select a found item first and then choose
            "Verify Ownership" to start the verification process.
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

      {/* =========================================
          PAGE HEADER
      ========================================== */}

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

      {/* =========================================
          SELECTED ITEM
      ========================================== */}

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">

        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Item You Want to Claim
        </p>

        <div className="flex gap-4">

          {/* Image */}

          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />

          {/* Details */}

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

      {/* =========================================
          INFORMATION NOTICE
      ========================================== */}

      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">

        <div className="flex gap-3">

          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-slate-600"
          />

          <div>

            <h3 className="text-sm font-semibold text-slate-700">
              Why is verification required?
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              These details help the reporter and campus administrator
              confirm that you are the rightful owner of the item.
              Please provide accurate information that can help identify
              your belongings.
            </p>

          </div>

        </div>

      </div>

      {/* =========================================
          SUCCESS MESSAGE
      ========================================== */}

      {submitted && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">

          <div className="flex gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <ShieldCheck size={18} />
            </div>

            <div>

              <h3 className="font-semibold text-slate-700">
                Verification request submitted
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your ownership verification request for{" "}
                <span className="font-medium text-slate-700">
                  {selectedItem.name}
                </span>{" "}
                has been submitted successfully.
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

      {/* =========================================
          VERIFICATION FORM
      ========================================== */}

      {!submitted && (<form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white"
      >

        {/* Form Header */}

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

          <h2 className="font-semibold text-slate-800">
            Verification Details
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Provide information that can help prove your ownership.
          </p>

        </div>

        {/* Form Body */}

        <div className="space-y-6 p-5 sm:p-6">

          {/* =====================================
              LOST LOCATION
          ====================================== */}

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

            <p className="mt-1.5 text-xs text-slate-400">
              This information will be used to compare your claim with
              the reported item.
            </p>

          </div>

          {/* =====================================
              DATE + TIME
          ====================================== */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Date */}

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
                max={new Date().toISOString().split("T")[0]}
                value={formData.lostDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
              />

            </div>

            {/* Time */}

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

          {/* =====================================
              IDENTIFYING DETAILS
          ====================================== */}

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

          {/* =====================================
              CONTACT NUMBER
          ====================================== */}

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
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g. 01XXXXXXXXX"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-200"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              The reporter or campus admin may contact you using this
              number if additional verification is required.
            </p>

          </div>

          {/* =====================================
              ADDITIONAL INFORMATION
          ====================================== */}

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

        {/* =========================================
            FORM FOOTER
        ========================================== */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-6">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <Send size={16} />
            Submit Verification
          </button>

        </div>

      </form>)}

    </div>
  );
};

export default OwnershipVerification;