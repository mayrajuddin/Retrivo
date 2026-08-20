import { useState } from "react";
import ReportTypeSelector from "../../components/ReportItem/ReportTypeSelector";
import ReportForm from "../../components/common/ReportForm";

const ReportItem = () => {
    const [reportType, setReportType] = useState("Lost");

  const handleSubmit = (data) => {
    console.log("Report submitted:", data);

    alert(
      `${data.status} item report submitted successfully!`
    );
  };
    return (
        <main className="min-h-screen bg-slate-50">

      {/* Header */}
      {/* <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Campus Lost & Found
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Report an Item
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Help your campus community recover lost
              belongings by reporting a lost or found item.
            </p>

          </div>
        </div>
      </section> */}

      {/* Form Section */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Report Type */}
          <ReportTypeSelector
            reportType={reportType}
            setReportType={setReportType}
          />

          {/* Form */}
          <ReportForm
            reportType={reportType}
            mode="create"
            onSubmit={handleSubmit}
          />

        </div>

      </section>

    </main>
    );
};

export default ReportItem;