import {
  FileText,
  Search,
  PackageCheck,
  RotateCcw,
} from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Reports",
      value: 12,
      icon: FileText,
    },
    {
      title: "Lost Items",
      value: 5,
      icon: Search,
    },
    {
      title: "Found Items",
      value: 7,
      icon: PackageCheck,
    },
    {
      title: "Recovered Items",
      value: 4,
      icon: RotateCcw,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Icon size={20} strokeWidth={1.8} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;