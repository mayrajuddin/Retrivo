import {
  MapPin,
  CalendarDays,
  X,
  ShieldCheck,
  User,
  LockKeyhole,
  ArrowLeft,
  CheckCircle2,
  Phone,
} from "lucide-react";

const ItemsDetailsModal = ({
  setVerificationStep,
  startVerification,
  closeModal,
  verificationStep,
  handleVerificationSubmit,
  selectedItem,
  isLoggedIn,
}) => {
  return (
    <>
      <dialog open className="modal modal-bottom sm:modal-middle">
        <div
          className="
              modal-box
              max-w-2xl
              w-11/12
              sm:w-full
              max-h-[90vh]
              p-0
              overflow-hidden
              bg-white
              flex
              flex-col
            "
        >
          <div
            className="
                flex
                items-center
                justify-between
                px-6
                py-5
                border-b
                shrink-0
                bg-white
                z-10
              "
          >
            <div>
              <p className="text-sm text-[#0f6a43] font-medium">
                {verificationStep ? "Ownership Verification" : "Item Details"}
              </p>

              <h3 className="text-xl font-bold text-[#0b2d5b] mt-1">
                {verificationStep ? "Verify Your Ownership" : selectedItem.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X size={20} />
            </button>
          </div>
          {!verificationStep && (
            <div
              className="
                  overflow-y-auto
                  overflow-x-hidden
                  flex-1
                  min-h-0
                "
            >
              <div className="h-64 bg-[#f7f5f2]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
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
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#f8faf9] rounded-xl p-4">
                    <p className="text-xs text-gray-500">Reported Date</p>

                    <div className="flex items-center gap-2 mt-1 text-[#0b2d5b] font-medium">
                      <CalendarDays size={17} />

                      {selectedItem.date}
                    </div>
                  </div>
                  <div className="bg-[#f8faf9] rounded-xl p-4">
                    <p className="text-xs text-gray-500">General Location</p>

                    <div className="flex items-center gap-2 mt-1 text-[#0b2d5b] font-medium">
                      <MapPin size={17} />

                      {selectedItem.location}
                    </div>
                  </div>
                </div>
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
                    <p className="text-xs text-gray-500">Reported by</p>

                    <p className="font-medium text-[#0b2d5b]">
                      {selectedItem.reporter}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-[#0b2d5b]">Description</h4>

                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    {selectedItem.description}
                  </p>
                </div>
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
                      The exact location and personal contact information are
                      hidden for privacy. Ownership verification is required
                      before claiming this item.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pb-2">
                  {isLoggedIn ? (
                    <button
                      type="button"
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
                          Please log in to verify ownership and claim this item.
                        </p>
                      </div>

                      <button
                        type="button"
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
          {verificationStep && (
            <form
              onSubmit={handleVerificationSubmit}
              className="
                  p-6
                  overflow-y-auto
                  overflow-x-hidden
                  flex-1
                  min-h-0
                "
            >
              {/* Intro */}

              <div
                className="
                    bg-[#e5f1ec]
                    rounded-xl
                    p-4
                    flex
                    gap-3
                  "
              >
                <ShieldCheck size={22} className="text-[#0f6a43] shrink-0" />

                <div>
                  <p className="font-semibold text-[#0b2d5b] text-sm">
                    Ownership verification
                  </p>

                  <p className="text-xs text-gray-600 mt-1 leading-5">
                    Answer the questions below to help us confirm that you are
                    the rightful owner.
                  </p>
                </div>
              </div>

              {/* Question 1 */}

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

              {/* Question 2 */}

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

              {/* Question 3 */}

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

              {/* Phone Number */}

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

              {/* Security Notice */}

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
                  Your answers and phone number will remain private. They will
                  only be used by the Retrivo team for ownership verification.
                </p>
              </div>

              {/* Buttons */}

              <div
                className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    gap-3
                    mt-7
                    pb-2
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

        {/* =================================================
              MODAL BACKDROP
          ================================================== */}

        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={closeModal}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
};

export default ItemsDetailsModal;
