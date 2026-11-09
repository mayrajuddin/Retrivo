
import { useState } from "react";
import ReportTypeSelector from "../../components/ReportItem/ReportTypeSelector";
import ReportForm from "../../components/common/ReportForm";
import { getCurrentUser } from "../../utils/authUser";

const ReportItem = () => {
  const [reportType, setReportType] = useState("Lost");

  const handleSubmit = (data) => {
    try {
      // Get previously saved reports
      const existingReports = JSON.parse(
        localStorage.getItem("retrivo_reports") || "[]"
      );

      // Get current user
      const currentUser = getCurrentUser();

      // Create new report
      const newReport = {
        ...data,
        id: Date.now(),
        reporterEmail: currentUser?.email || "",
        reportStatus: "Pending",
        createdAt: new Date().toISOString(),
      };

      // Save report
      const updatedReports = [
        newReport,
        ...existingReports,
      ];

      localStorage.setItem(
        "retrivo_reports",
        JSON.stringify(updatedReports)
      );

      alert(
        `${data.status} item report submitted successfully!`
      );

      console.log("Saved Report:", newReport);

    } catch (error) {
      console.error("Report submission failed:", error);

      alert(
        "Unable to save your report. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <ReportTypeSelector
            reportType={reportType}
            setReportType={setReportType}
          />

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
