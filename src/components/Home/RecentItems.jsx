import { Suspense, useState } from "react";
import { ArrowRight, PackageSearch } from "lucide-react";
import ItemsDetailsModal from "./ItemsDetailsModal";
import ItemCard from "../common/ItemCard";
import { Link } from "react-router";
const RecentItems = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Demo authentication state
  // Replace this with your actual authentication state later.
  const [isLoggedIn] = useState(true);

  const openDetails = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

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

          <Link
  to="/browse-items"
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
</Link>
        </div>

        {/* =====================================================
            ITEMS GRID
        ====================================================== */}

        <Suspense fallback={<span> loading....</span>}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} handleClick={openDetails} />
            ))}
          </div>
        </Suspense>
      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}

      {selectedItem && (
        <ItemsDetailsModal
          isLoggedIn={isLoggedIn}
          closeModal={closeModal}
          selectedItem={selectedItem}
        />
      )}
    </section>
  );
};

export default RecentItems;
