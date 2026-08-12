import { MapPin, CalendarDays, ArrowRight, PackageSearch } from "lucide-react";

const items = [
  {
    id: 1,
    name: "Black Backpack",
    category: "Bag",
    location: "Central Library",
    date: "Aug 10, 2026",
    status: "Found",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Student ID Card",
    category: "ID Card",
    location: "Cafeteria",
    date: "Aug 09, 2026",
    status: "Found",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Black Wallet",
    category: "Wallet",
    location: "Academic Building",
    date: "Aug 08, 2026",
    status: "Lost",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Silver Key",
    category: "Keys",
    location: "Main Gate",
    date: "Aug 08, 2026",
    status: "Found",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    category: "Electronics",
    location: "Computer Lab",
    date: "Aug 07, 2026",
    status: "Lost",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Blue Water Bottle",
    category: "Personal Item",
    location: "Sports Ground",
    date: "Aug 06, 2026",
    status: "Found",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
  },
];

const RecentItems = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#0f6a43] font-medium text-sm mb-3">
              <PackageSearch size={18} />
              Latest Listings
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0b2d5b]">
              Recent Lost & Found Items
            </h2>

            <p className="mt-3 text-gray-600 max-w-2xl">
              Browse the latest items reported by members of the campus
              community. You might just find what you've been looking for.
            </p>
          </div>

          <button className="btn btn-outline border-[#0b2d5b] text-[#0b2d5b] hover:bg-[#0b2d5b] hover:border-[#0b2d5b] hover:text-white">
            View All Items
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 bg-[#f7f5f2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Status */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    item.status === "Found"
                      ? "bg-[#e5f1ec] text-[#0f6a43]"
                      : "bg-[#fff1e8] text-[#b45309]"
                  }`}
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

                  <button className="w-9 h-9 rounded-full bg-[#f3f6f5] flex items-center justify-center text-[#0f6a43] hover:bg-[#0f6a43] hover:text-white transition">
                    <ArrowRight size={17} />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                  <MapPin size={16} className="text-[#0f6a43]" />
                  {item.location}
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <CalendarDays size={16} className="text-[#0f6a43]" />
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentItems;
