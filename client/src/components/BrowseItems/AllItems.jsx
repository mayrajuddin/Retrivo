
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ItemCard from "../common/ItemCard";
import ItemDetailsModal from "../../components/Home/ItemsDetailsModal";
import ItemFilter from "./ItemFilter";

const API_URL = import.meta.env.VITE_API_URL;

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Authentication state
  const [isLoggedIn] = useState(true);

  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch admin-approved reports
  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/items/approved`, {
      method: "GET",
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch items");
        }

        // Convert MongoDB data into the format used by existing components
        const formattedItems = (data.items || []).map((item) => ({
          ...item,
          id: item._id,
          name: item.title,
          image: item.item_image,
          category: item.category_id?.category_name || "Uncategorized",
          status: item.type === "lost" ? "Lost" : "Found",
          date: item.report_date
            ? new Date(item.report_date).toLocaleDateString()
            : "",
        }));

        setItems(formattedItems);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch approved items error:", error);
          setError(error.message || "Failed to load items");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Filter items
  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.status === filter);

  // Total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Current page items
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
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

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-80 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-slate-700"></span>
        </div>
      ) : error ? (
        <div className="flex min-h-80 items-center justify-center rounded-2xl border border-red-200 bg-red-50">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-red-700">
              Failed to load items
            </h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      ) : (
        <>
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
                  {filter === "Lost"
                    ? "lost"
                    : filter === "Found"
                      ? "found"
                      : ""}{" "}
                  items reported.
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
        </>
      )}

      {/* Details Modal */}
      {selectedItem && (
        <ItemDetailsModal
          isLoggedIn={isLoggedIn}
          closeModal={handleCloseModal}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default AllItems;
