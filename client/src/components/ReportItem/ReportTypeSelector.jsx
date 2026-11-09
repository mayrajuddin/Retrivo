import { PackageSearch, SearchCheck } from "lucide-react";

const ReportTypeSelector = ({ reportType, setReportType }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-base font-semibold text-slate-800">
        What would you like to report?
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Lost Item */}
        <button
          type="button"
          onClick={() => setReportType("Lost")}
          className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
            reportType === "Lost"
              ? "border-slate-800 bg-slate-50 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-400"
          }`}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-lg ${
              reportType === "Lost"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <PackageSearch size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              I Lost an Item
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Report something you have lost on campus.
            </p>
          </div>
        </button>

        {/* Found Item */}
        <button
          type="button"
          onClick={() => setReportType("Found")}
          className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
            reportType === "Found"
              ? "border-slate-800 bg-slate-50 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-400"
          }`}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-lg ${
              reportType === "Found"
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <SearchCheck size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              I Found an Item
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Report something you found on campus.
            </p>
          </div>
        </button>

      </div>
    </div>
  );
};

export default ReportTypeSelector;