import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const ItemCard = ({item,handleClick}) => {
    return (
        <>
            <div
        key={item.id}
        onClick={() => handleClick(item)}
        className="
                group
                cursor-pointer
                bg-white
                border
                border-gray-200
                rounded-2xl
                overflow-hidden
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
      >
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
          <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
            <MapPin size={16} className="text-[#0f6a43]" />
            {item.location}
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <CalendarDays size={16} className="text-[#0f6a43]" />
            {item.date}
          </div>
        </div>
      </div>
        </>
    );
};

export default ItemCard;