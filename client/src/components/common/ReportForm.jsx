import { useState } from "react";
import { Upload } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
const ReportForm = ({
  reportType,
  initialData = {},
  mode = "create",
  onSubmit,
  categories = [],
  categoriesLoading = false,
  categoriesError = "",
}) => {
  const {user}=useAuth();
  // console.log(user);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    category: initialData.category || "",
    location: initialData.location || "",
    exactLocation: initialData.exactLocation || "",
    date: initialData.date || "",
    description: initialData.description || "",
    reporter: initialData.reporter ?? null,
    contactNumber: initialData.contactNumber ?? null,
    image: initialData.image || "",
    status: reportType || initialData.status || "Lost",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please select a JPG or PNG image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    setImageFile(file);

    // Generate image preview only
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const finalData = {
        ...formData,
        reporter: formData.reporter ?? user?.name ?? "",
        image: initialData.image || "",
        imageFile: imageFile,
        contactNumber: formData.contactNumber ?? user?.phone ?? "",
        status: reportType,
      };

      await onSubmit(finalData);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Item Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Item Name *
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Black Backpack"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Category *
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          disabled={categoriesLoading || !!categoriesError}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">
            {categoriesLoading
              ? "Loading categories..."
              : categoriesError
                ? "Unable to load categories"
                : "Select category"}
          </option>

          {categories.map((category) => (
            <option key={category._id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Location *
        </label>

        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="">Select location</option>
          <option value="Academic Building">Academic Building</option>
          <option value="Central Library">Central Library</option>
          <option value="Cafeteria">Cafeteria</option>
          <option value="Computer Lab">Computer Lab</option>
          <option value="Sports Ground">Sports Ground</option>
          <option value="Main Gate">Main Gate</option>
          <option value="Auditorium">Auditorium</option>
          <option value="Student Lounge">Student Lounge</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Exact Location */}
      <div>
        <label
          htmlFor="exactLocation"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Exact Location *
        </label>

        <input
          id="exactLocation"
          name="exactLocation"
          type="text"
          value={formData.exactLocation}
          onChange={handleChange}
          placeholder="e.g. Central Library - 2nd Floor"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          Your exact location will not be publicly displayed on the item card.
        </p>
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {reportType === "Lost"
            ? "When did you lose this item?"
            : "When did you find this item?"}
          {" *"}
        </label>

        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Description *
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Describe the item and any identifying details..."
          required
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Item Image
        </label>

        <label
          htmlFor="image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-500"
        >
          <Upload size={28} className="mb-3 text-slate-500" />

          <span className="text-sm font-medium text-slate-700">
            {imageFile ? imageFile.name : "Upload item image"}
          </span>

          <span className="mt-1 text-xs text-slate-500">
            JPG, PNG up to 5MB
          </span>

          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Selected item"
              className="h-40 w-40 rounded-xl border border-slate-200 object-cover"
            />
          </div>
        )}
      </div>

      {/* Reporter */}
      <div>
        <label
          htmlFor="reporter"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Your Name *
        </label>

        <input
          id="reporter"
          name="reporter"
          type="text"
          value={formData.reporter ?? user?.name ?? ""}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Contact Number */}
      <div>
        <label
          htmlFor="contactNumber"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Contact Number *
        </label>

        <input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          value={formData.contactNumber ?? user?.phone ?? ""}
          onChange={handleChange}
          placeholder="01XXXXXXXXX"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          Your contact number may be used to help verify ownership or arrange
          item recovery.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Submitting..."
          : mode === "edit"
            ? "Update Item"
            : reportType === "Lost"
              ? "Report Lost Item"
              : "Report Found Item"}
      </button>
    </form>
  );
};

export default ReportForm;
