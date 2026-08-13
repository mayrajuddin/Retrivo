import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ItemCard from "../common/ItemCard";
import ItemDetailsModal from "../../components/Home/ItemsDetailsModal";
import ItemFilter from "./ItemFilter";

const AllItems = () => {
  const items = useRouteLoaderData("root");
  const [verificationStep, setVerificationStep] = useState(false);

  // Demo authentication state
  const [isLoggedIn] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  // Filter items
  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.status === filter);

  // Total pages
  const totalPages = Math.ceil(
    filteredItems.length / itemsPerPage
  );

  // Current page items
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    // Filter change korle suru theke asbe
    setCurrentPage(1);
  };

  // Card click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedItem(null);
  };
const startVerification = () => {
    if (!isLoggedIn) {
      return;
    }

    setVerificationStep(true);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    // Later send these values to your backend/API.

    alert(
      "Your ownership verification request has been submitted successfully.",
    );
  };
  // Previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {/* Filter */}
      <ItemFilter
        filter={filter}
        setFilter={handleFilterChange}
      />

      {/* Result count */}
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredItems.length}
          </span>{" "}
          {filter === "all"
            ? "items"
            : filter === "Lost"
            ? "lost items"
            : "found items"}
        </p>
      </div>

      {/* Items */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleClick={handleItemClick} 
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-slate-700">
              No items found
            </h3>

            <p className="text-sm text-slate-500">
              There are currently no{" "}
              {filter === "Lost" ? "lost" : "found"} items
              reported.
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">

          {/* Previous */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition ${
                currentPage === page
                  ? "bg-slate-800 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>

        </div>
      )}

      {/* Details Modal */}
      {selectedItem && (
        <ItemDetailsModal
          setVerificationStep={setVerificationStep}
          isLoggedIn={isLoggedIn}
          handleVerificationSubmit={handleVerificationSubmit}
          startVerification={startVerification}
          verificationStep={verificationStep}
          closeModal={handleCloseModal}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default AllItems;