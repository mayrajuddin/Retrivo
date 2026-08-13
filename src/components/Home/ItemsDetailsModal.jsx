import { useNavigate } from "react-router";
import {
  X,
  CalendarDays,
  MapPin,
  ShieldCheck,
  LockKeyhole,
  Phone,
} from "lucide-react";

const ItemsDetailsModal = ({
  selectedItem,
  closeModal,
  isLoggedIn,
}) => {
  const navigate = useNavigate();

  if (!selectedItem) {
    return null;
  }

  const handleVerifyOwnership = () => {
    if (!isLoggedIn) {
      closeModal();
      navigate("/login");
      return;
    }

    closeModal();

    navigate(
      `/dashboard/verification?item=${selectedItem.id}`
    );
  };

  return (
    <dialog
      open
      className="modal modal-bottom sm:modal-middle"
    >
      <div
        className="
          modal-box
          max-w-2xl
          max-h-[90vh]
          p-0
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* =========================================
            HEADER
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-200
            bg-white
            px-5
            py-4
            shrink-0
          "
        >
          <div>
            <p className="text-sm font-medium text-gray-500">
              Item Details
            </p>

            <h3 className="text-xl font-bold text-[#0b2d5b] mt-1">
              {selectedItem.name}
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

        {/* =========================================
            SCROLLABLE CONTENT
        ========================================== */}

        <div
          className="
            overflow-y-auto
            overflow-x-hidden
            flex-1
            min-h-0
          "
        >
          {/* Image */}

          <div className="h-64 bg-[#f7f5f2]">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}

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

            {/* Date + Location */}

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

                <p className="mt-1 text-xs text-gray-400">
                  Exact location is hidden for privacy.
                </p>

              </div>

            </div>

            {/* Description */}

            <div className="mt-6">

              <p className="text-sm font-semibold text-[#0b2d5b]">
                Description
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {selectedItem.description}
              </p>

            </div>

            {/* Reporter */}

            <div className="mt-6 rounded-xl bg-[#f8faf9] p-4">

              <p className="text-xs text-gray-500">
                Reported By
              </p>

              <p className="mt-1 font-medium text-[#0b2d5b]">
                {selectedItem.reporter}
              </p>

            </div>

            {/* Contact / Collection Information */}

            {selectedItem.status === "Found" && (
              <div className="mt-4 rounded-xl border border-[#e5f1ec] bg-[#f8faf9] p-4">

                <div className="flex gap-3">

                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-[#0f6a43]"
                  />

                  <div>

                    <p className="text-sm font-semibold text-[#0b2d5b]">
                      How to claim this item?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      If you believe this item belongs to you,
                      verify your ownership first. The reporter or
                      campus administrator may contact you for
                      additional verification.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* =====================================
                OWNERSHIP VERIFICATION
            ====================================== */}

            {selectedItem.status === "Found" && (
              <div className="mt-6">

                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleVerifyOwnership}
                    className="
                      btn
                      w-full
                      bg-[#0f6a43]
                      hover:bg-[#0c5a38]
                      text-white
                      border-none
                    "
                  >
                    <ShieldCheck size={19} />

                    Verify Ownership
                  </button>
                ) : (
                  <div>

                    <button
                      type="button"
                      onClick={handleVerifyOwnership}
                      className="
                        btn
                        w-full
                        bg-[#0f6a43]
                        hover:bg-[#0c5a38]
                        text-white
                        border-none
                      "
                    >
                      <LockKeyhole size={19} />

                      Login to Verify Ownership
                    </button>

                    <p className="mt-2 text-center text-xs text-gray-400">
                      You need to be logged in to verify ownership.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* =========================================
            FOOTER
        ========================================== */}

        <div
          className="
            border-t
            border-gray-200
            bg-white
            px-5
            py-4
            shrink-0
          "
        >
          <button
            type="button"
            onClick={closeModal}
            className="
              btn
              w-full
              bg-white
              border-gray-200
              text-gray-600
              hover:bg-gray-50
            "
          >
            Close
          </button>
        </div>

      </div>

      {/* =========================================
          MODAL BACKDROP
      ========================================== */}

      <form
        method="dialog"
        className="modal-backdrop"
        onClick={closeModal}
      >
        <button type="button">
          close
        </button>
      </form>

    </dialog>
  );
};

export default ItemsDetailsModal;