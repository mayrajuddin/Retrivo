import {
  MapPin,
  CalendarDays,
  ArrowRight,
  PackageSearch,
  X,
  ShieldCheck,
  User,
  LockKeyhole,
  ArrowLeft,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Black Backpack",
    category: "Bag",
    location: "Campus Area",
    exactLocation: "Central Library - 2nd Floor",
    date: "Aug 10, 2026",
    status: "Found",
    reporter: "Rahim Ahmed",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description:
      "A black backpack with a small blue keychain attached to the side. The bag contains some books and personal belongings.",
  },
  {
    id: 2,
    name: "Student ID Card",
    category: "ID Card",
    location: "Campus Area",
    exactLocation: "Cafeteria - Ground Floor",
    date: "Aug 09, 2026",
    status: "Found",
    reporter: "Nusrat Jahan",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    description:
      "A student identification card found on campus.",
  },
  {
    id: 3,
    name: "Black Wallet",
    category: "Wallet",
    location: "Campus Area",
    exactLocation: "Academic Building - Room 204",
    date: "Aug 08, 2026",
    status: "Lost",
    reporter: "Sakib Hasan",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    description:
      "A black leather wallet that was lost somewhere around the academic building.",
  },
  {
    id: 4,
    name: "Silver Key",
    category: "Keys",
    location: "Campus Area",
    exactLocation: "Main Gate Waiting Area",
    date: "Aug 08, 2026",
    status: "Found",
    reporter: "Tanvir Rahman",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
    description:
      "A silver key found near the campus entrance.",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    category: "Electronics",
    location: "Campus Area",
    exactLocation: "Computer Lab - 3rd Floor",
    date: "Aug 07, 2026",
    status: "Lost",
    reporter: "Afsana Karim",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    description:
      "Wireless earbuds in a small charging case.",
  },
  {
    id: 6,
    name: "Blue Water Bottle",
    category: "Personal Item",
    location: "Campus Area",
    exactLocation: "Sports Ground",
    date: "Aug 06, 2026",
    status: "Found",
    reporter: "Mahin Chowdhury",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description:
      "A blue reusable water bottle found on campus.",
  },
];

const RecentItems = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [verificationStep, setVerificationStep] = useState(false);

  // Demo authentication state
  // Replace this with your real authentication state later.
  const [isLoggedIn] = useState(true);

  const openDetails = (item) => {
    setSelectedItem(item);
    setVerificationStep(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setVerificationStep(false);
  };

  const startVerification = () => {
    if (!isLoggedIn) {
      return;
    }

    setVerificationStep(true);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    // Later:
    // Send verification data to backend/API
    // Example:
    // {
    //   itemId,
    //   lostLocation,
    //   lostDate,
    //   uniqueFeature,
    //   phone
    // }

    alert(
      "Your ownership verification request has been submitted successfully."
    );
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ================= SECTION HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>
            <div className="flex items-center gap-2 text-[#0f6a43] font-medium text-sm mb-3">
              <PackageSearch size={18} />
              Latest Listings
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0b2d5b]">
              Recent Lost & Found Items
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl leading-7">
              Browse the latest items reported by members of the campus
              community. You might just find what you've been looking for.
            </p>
          </div>

          <button
            className="
              btn
              btn-outline
              border-[#0b2d5b]
              text-[#0b2d5b]
              hover:bg-[#0b2d5b]
              hover:border-[#0b2d5b]
              hover:text-white
            "
          >
            View All Items
            <ArrowRight size={17} />
          </button>

        </div>


        {/* ================= ITEMS GRID ================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => openDetails(item)}
              className="
                group
                cursor-pointer
                bg-white
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                hover:shadow-lg hover:shadow-blue-500/20
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Item Image */}
              <div className="relative h-52 bg-[#f7f5f2] overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                  "
                />

                {/* Status Badge */}
                <div
                  className={`
                    absolute
                    top-4
                    left-4
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      item.status === "Found"
                        ? "bg-[#e5f1ec] text-[#0f6a43]"
                        : "bg-[#fff1e8] text-[#b45309]"
                    }
                  `}
                >
                  {item.status}
                </div>

              </div>


              {/* Card Content */}
              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="text-xs text-[#0f6a43] font-medium mb-1">
                      {item.category}
                    </p>

                    <h3 className="text-lg font-semibold text-[#0b2d5b]">
                      {item.name}
                    </h3>

                  </div>

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-[#f3f6f5]
                      flex
                      items-center
                      justify-center
                      text-[#0f6a43]
                      group-hover:bg-[#0f6a43]
                      group-hover:text-white
                      transition
                    "
                  >
                    <ArrowRight size={17} />
                  </div>

                </div>


                {/* General Location */}
                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                  <MapPin
                    size={16}
                    className="text-[#0f6a43]"
                  />

                  {item.location}
                </div>


                {/* Date */}
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <CalendarDays
                    size={16}
                    className="text-[#0f6a43]"
                  />

                  {item.date}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>


      {/* =====================================================
          ITEM DETAILS / VERIFICATION MODAL
      ====================================================== */}

      {selectedItem && (

        <dialog
          open
          className="modal modal-bottom sm:modal-middle"
        >

          <div className="modal-box max-w-2xl p-0 overflow-hidden bg-white">


            {/* ================= MODAL HEADER ================= */}

            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>

                <p className="text-sm text-[#0f6a43] font-medium">

                  {verificationStep
                    ? "Ownership Verification"
                    : "Item Details"}

                </p>

                <h3 className="text-xl font-bold text-[#0b2d5b] mt-1">

                  {verificationStep
                    ? "Verify Your Ownership"
                    : selectedItem.name}

                </h3>

              </div>


              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X size={20} />
              </button>

            </div>


            {/* =================================================
                STEP 1 — ITEM DETAILS
            ================================================== */}

            {!verificationStep && (

              <div>

                {/* Image */}
                <div className="h-64 bg-[#f7f5f2]">

                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />

                </div>


                <div className="p-6">


                  {/* Status + Category */}

                  <div className="flex flex-wrap items-center gap-2">

                    <span
                      className={`
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold

                        ${
                          selectedItem.status === "Found"
                            ? "bg-[#e5f1ec] text-[#0f6a43]"
                            : "bg-[#fff1e8] text-[#b45309]"
                        }
                      `}
                    >
                      {selectedItem.status}
                    </span>


                    <span
                      className="
                        px-3
                        py-1.5
                        rounded-full
                        bg-gray-100
                        text-gray-600
                        text-xs
                      "
                    >
                      {selectedItem.category}
                    </span>

                  </div>


                  {/* Basic Information */}

                  <div className="grid sm:grid-cols-2 gap-4 mt-6">


                    {/* Date */}

                    <div className="bg-[#f8faf9] rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        Reported Date
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-[#0b2d5b] font-medium">

                        <CalendarDays size={17} />

                        {selectedItem.date}

                      </div>

                    </div>


                    {/* Location */}

                    <div className="bg-[#f8faf9] rounded-xl p-4">

                      <p className="text-xs text-gray-500">
                        General Location
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-[#0b2d5b] font-medium">

                        <MapPin size={17} />

                        {selectedItem.location}

                      </div>

                    </div>

                  </div>


                  {/* ================= REPORTER ================= */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-3
                      p-4
                      border
                      border-gray-200
                      rounded-xl
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#e5f1ec]
                        flex
                        items-center
                        justify-center
                        text-[#0f6a43]
                      "
                    >
                      <User size={19} />
                    </div>


                    <div>

                      <p className="text-xs text-gray-500">
                        Reported by
                      </p>

                      <p className="font-medium text-[#0b2d5b]">
                        {selectedItem.reporter}
                      </p>

                    </div>

                  </div>


                  {/* ================= DESCRIPTION ================= */}

                  <div className="mt-6">

                    <h4 className="font-semibold text-[#0b2d5b]">
                      Description
                    </h4>

                    <p className="mt-2 text-sm text-gray-600 leading-6">
                      {selectedItem.description}
                    </p>

                  </div>


                  {/* ================= PRIVACY NOTICE ================= */}

                  <div
                    className="
                      mt-6
                      flex
                      gap-3
                      p-4
                      bg-[#f7f5f2]
                      rounded-xl
                    "
                  >

                    <LockKeyhole
                      size={20}
                      className="text-[#0f6a43] shrink-0 mt-0.5"
                    />


                    <div>

                      <p className="font-medium text-[#0b2d5b] text-sm">
                        Location & contact information are protected
                      </p>

                      <p className="text-xs text-gray-500 mt-1 leading-5">
                        The exact location and personal contact information
                        are hidden for privacy. Ownership verification is
                        required before claiming this item.
                      </p>

                    </div>

                  </div>


                  {/* ================= ACTION ================= */}

                  <div className="mt-6">

                    {isLoggedIn ? (

                      <button
                        onClick={startVerification}
                        className="
                          btn
                          w-full
                          bg-[#0f6a43]
                          hover:bg-[#0c5a38]
                          text-white
                          border-none
                        "
                      >

                        <ShieldCheck size={18} />

                        Verify Ownership

                      </button>

                    ) : (

                      <div className="space-y-3">

                        <div
                          className="
                            p-4
                            bg-[#fff8ed]
                            border
                            border-[#f3dfbd]
                            rounded-xl
                          "
                        >

                          <p className="font-medium text-[#92400e] text-sm">
                            Login required
                          </p>

                          <p className="text-xs text-gray-600 mt-1">
                            Please log in to verify ownership and claim
                            this item.
                          </p>

                        </div>


                        <button
                          className="
                            btn
                            w-full
                            bg-[#0b2d5b]
                            hover:bg-[#082344]
                            text-white
                            border-none
                          "
                        >
                          Log In to Continue
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                STEP 2 — OWNERSHIP VERIFICATION
            ================================================== */}

            {verificationStep && (

              <form
                onSubmit={handleVerificationSubmit}
                className="p-6"
              >

                {/* ================= INTRO ================= */}

                <div
                  className="
                    bg-[#e5f1ec]
                    rounded-xl
                    p-4
                    flex
                    gap-3
                  "
                >

                  <ShieldCheck
                    size={22}
                    className="text-[#0f6a43] shrink-0"
                  />

                  <div>

                    <p className="font-semibold text-[#0b2d5b] text-sm">
                      Ownership verification
                    </p>

                    <p className="text-xs text-gray-600 mt-1 leading-5">
                      Answer the questions below to help us confirm
                      that you are the rightful owner.
                    </p>

                  </div>

                </div>


                {/* ================= QUESTION 1 ================= */}

                <div className="mt-7">

                  <label className="label">

                    <span className="label-text font-medium text-[#0b2d5b]">
                      Where did you lose this item?
                    </span>

                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Enter the approximate location"
                    className="
                      input
                      input-bordered
                      w-full
                      focus:outline-none
                      focus:border-[#0f6a43]
                    "
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    This information will be used only for verification.
                  </p>

                </div>


                {/* ================= QUESTION 2 ================= */}

                <div className="mt-5">

                  <label className="label">

                    <span className="label-text font-medium text-[#0b2d5b]">
                      When did you lose this item?
                    </span>

                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. August 9, around 3 PM"
                    className="
                      input
                      input-bordered
                      w-full
                      focus:outline-none
                      focus:border-[#0f6a43]
                    "
                  />

                </div>


                {/* ================= QUESTION 3 ================= */}

                <div className="mt-5">

                  <label className="label">

                    <span className="label-text font-medium text-[#0b2d5b]">
                      What is a unique feature of this item?
                    </span>

                  </label>

                  <textarea
                    required
                    rows="3"
                    placeholder="Describe something that only the owner is likely to know..."
                    className="
                      textarea
                      textarea-bordered
                      w-full
                      focus:outline-none
                      focus:border-[#0f6a43]
                    "
                  />

                </div>


                {/* ================= PHONE NUMBER ================= */}

                <div className="mt-5">

                  <label className="label">

                    <span className="label-text font-medium text-[#0b2d5b]">
                      Phone Number
                    </span>

                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-[#0f6a43]
                      "
                    />

                    <input
                      type="tel"
                      required
                      placeholder="+880 1XXXXXXXXX"
                      pattern="[+0-9\s-]{10,16}"
                      className="
                        input
                        input-bordered
                        w-full
                        pl-10
                        focus:outline-none
                        focus:border-[#0f6a43]
                      "
                    />

                  </div>


                  {/* Phone Explanation */}

                  <div className="flex items-start gap-2 mt-2">

                    <Phone
                      size={14}
                      className="
                        text-[#0f6a43]
                        mt-0.5
                        shrink-0
                      "
                    />

                    <p className="text-xs text-gray-500 leading-5">
                      We may contact you using this number if additional
                      information is needed to verify your claim.
                    </p>

                  </div>

                </div>


                {/* ================= SECURITY NOTICE ================= */}

                <div
                  className="
                    mt-5
                    flex
                    gap-3
                    p-4
                    bg-[#f7f5f2]
                    rounded-xl
                  "
                >

                  <LockKeyhole
                    size={18}
                    className="
                      text-[#0f6a43]
                      shrink-0
                      mt-0.5
                    "
                  />

                  <p className="text-xs text-gray-500 leading-5">
                    Your answers and phone number will remain private.
                    They will only be used by the Retrivo team for
                    ownership verification.
                  </p>

                </div>


                {/* ================= BUTTONS ================= */}

                <div
                  className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    gap-3
                    mt-7
                  "
                >

                  {/* Back */}

                  <button
                    type="button"
                    onClick={() => setVerificationStep(false)}
                    className="
                      btn
                      flex-1
                      bg-white
                      border-gray-300
                      text-[#0b2d5b]
                      hover:bg-gray-50
                    "
                  >

                    <ArrowLeft size={17} />

                    Back

                  </button>


                  {/* Submit */}

                  <button
                    type="submit"
                    className="
                      btn
                      flex-1
                      bg-[#0f6a43]
                      hover:bg-[#0c5a38]
                      text-white
                      border-none
                    "
                  >

                    <CheckCircle2 size={18} />

                    Submit Verification

                  </button>

                </div>

              </form>

            )}

          </div>


          {/* ================= MODAL BACKDROP ================= */}

          <form
            method="dialog"
            className="modal-backdrop"
            onClick={closeModal}
          >
            <button>close</button>
          </form>

        </dialog>

      )}

    </section>
  );
};
export default RecentItems;