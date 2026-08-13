import { ListFilter } from "lucide-react";

const ItemFilter = ({ filter, setFilter }) => {
  const filters = [
    {
      label: "All Items",
      value: "all",
    },
    {
      label: "Lost Items",
      value: "Lost",
    },
    {
      label: "Found Items",
      value: "Found",
    },
  ];

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Filter title */}
      <div className="flex items-center gap-2">
        <ListFilter size={20} className="text-slate-600" />

        <span className="font-medium text-slate-700">
          Filter Items
        </span>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              filter === item.value
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemFilter;