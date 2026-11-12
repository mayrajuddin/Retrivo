
import { useEffect, useState } from "react";
import ReportTypeSelector from "../../components/ReportItem/ReportTypeSelector";
import ReportForm from "../../components/common/ReportForm";

const API_URL = import.meta.env.VITE_API_URL;

const ReportItem = () => {
  const [reportType, setReportType] = useState("Lost");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

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

  // Submit item report to backend
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

      // Attach image if selected
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

      alert(result.message || "Item report submitted successfully!");

      console.log("Submitted Report:", result.item);
    } catch (error) {
      console.error("Report submission failed:", error);

      alert(
        error.message || "Unable to submit your report. Please try again."
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
        </div>
      </section>
    </main>
  );
};

export default ReportItem;
