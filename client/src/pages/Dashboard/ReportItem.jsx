
import { useEffect, useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import ReportTypeSelector from "../../components/ReportItem/ReportTypeSelector";
import ReportForm from "../../components/common/ReportForm";

const API_URL = import.meta.env.VITE_API_URL;

const ReportItem = () => {
  const [reportType, setReportType] = useState("Lost");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [submittedItem, setSubmittedItem] = useState(null);

  // Fetch categories from MongoDB
  useEffect(() => {
    let ignore = false;

    async function loadCategories() {
      try {
        const response = await fetch(`${API_URL}/items/categories`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load categories");
        }

        if (!ignore) {
          setCategories(data.categories || []);
          setCategoriesError("");
        }
      } catch (error) {
        console.error("Category loading failed:", error);

        if (!ignore) {
          setCategoriesError(
            error.message || "Unable to load categories."
          );
        }
      } finally {
        if (!ignore) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  // Submit item report
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.name);
      formData.append("type", data.status.toLowerCase());
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("exact_location", data.exactLocation || "");
      formData.append("report_date", data.date);
      formData.append("contact_number", data.contactNumber);

      if (data.imageFile) {
        formData.append("item_image", data.imageFile);
      }

      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit report");
      }

      // Show success message instead of alert
      setSubmittedItem(result.item);

      console.log("Submitted Report:", result.item);

    } catch (error) {
      console.error("Report submission failed:", error);
      throw error;
    }
  };

  // Start another report
  const handleNewReport = () => {
    setSubmittedItem(null);
    setReportType("Lost");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {submittedItem ? (
            // Success Message
            <div className="py-10 text-center">

              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2
                  size={44}
                  className="text-green-600"
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                Report Submitted Successfully!
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Your {submittedItem.type} item report has been submitted.
                Thank you for helping our campus community!
              </p>

              <div className="mx-auto mt-6 max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Submitted Item
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {submittedItem.title}
                </p>

                <p className="mt-1 text-sm capitalize text-slate-500">
                  {submittedItem.type} Item
                </p>
              </div>

              <button
                type="button"
                onClick={handleNewReport}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <Plus size={18} />
                Report Another Item
              </button>

            </div>
          ) : (
            // Report Form
            <>
              <ReportTypeSelector
                reportType={reportType}
                setReportType={setReportType}
              />

              {categoriesError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-700">
                    {categoriesError}
                  </p>

                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm font-semibold text-red-700 underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              <ReportForm
                reportType={reportType}
                mode="create"
                onSubmit={handleSubmit}
                categories={categories}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
              />
            </>
          )}

        </div>
      </section>
    </main>
  );
};

export default ReportItem;
