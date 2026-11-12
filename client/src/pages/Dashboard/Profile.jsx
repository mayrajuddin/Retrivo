
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  Save,
  X,
  Camera,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, refreshUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    photoURL: user?.photoURL || "",
  });

  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      photoURL: user?.photoURL || "",
    });

    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      photoURL: user?.photoURL || "",
    });

    setError("");
    setIsEditing(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (isSaving) return;

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          photoURL: formData.photoURL.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed.");
      }

      await refreshUser();

      setIsEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      setError(error.message || "Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">

      {/* PROFILE HEADER CARD */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <div className="h-28 bg-slate-100"></div>

        <div className="px-5 pb-6 sm:px-6">

          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex items-end gap-4">

              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="h-24 w-24 shrink-0 rounded-full border-4 border-white bg-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-slate-800 text-2xl font-bold text-white shadow-sm">
                  {initials}
                </div>
              )}

              <div className="pb-1">

                <h2 className="text-xl font-bold text-slate-800">
                  {displayName}
                </h2>

                <p className="mt-1 text-sm capitalize text-slate-500">
                  {user?.role || "user"}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <Pencil size={16} />
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      {/* SUCCESS / ERROR MESSAGE */}

      {success && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {error && !isEditing && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* PROFILE DETAILS */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* PERSONAL INFORMATION */}

        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">

          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

            <h2 className="font-semibold text-slate-800">
              Personal Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your basic account information.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">

            <ProfileInfo
              icon={<User size={17} />}
              label="Full Name"
              value={user?.name}
            />

            <ProfileInfo
              icon={<Mail size={17} />}
              label="Email Address"
              value={user?.email}
            />

            <ProfileInfo
              icon={<Phone size={17} />}
              label="Phone Number"
              value={user?.phone}
            />

            <ProfileInfo
              icon={<ShieldCheck size={17} />}
              label="Account Role"
              value={user?.role}
            />

          </div>

        </div>

        {/* ACCOUNT INFORMATION */}

        <div className="rounded-xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-5 py-5">

            <h2 className="font-semibold text-slate-800">
              Account
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage your account settings.
            </p>

          </div>

          <div className="space-y-3 p-5">

            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium text-white ${
                    user?.status === "active"
                      ? "bg-slate-800"
                      : "bg-red-600"
                  }`}
                >
                  {user?.status || "Unknown"}
                </span>

              </div>

            </div>

            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Login Method
                </span>

                <span className="text-xs font-medium capitalize text-slate-700">
                  {user?.authProvider || "Email"}
                </span>

              </div>

            </div>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-4 text-left transition hover:bg-slate-50"
              onClick={() => alert("Change Password feature will be added later.")}
            >
              <LockKeyhole size={18} className="text-slate-500" />

              <div>
                <p className="text-sm font-medium text-slate-700">
                  Change Password
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Update your account password
                </p>
              </div>

            </button>

          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}

      {isEditing && (
        <dialog open className="modal modal-bottom sm:modal-middle">

          <div className="modal-box max-w-2xl p-0">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Edit Profile
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Update your personal information.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X size={18} />
              </button>

            </div>

            <form onSubmit={handleSave}>

              <div className="space-y-5 p-5 sm:p-6">

                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-500"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Email address cannot be changed.
                  </p>
                </div>

                {/* PHONE */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-500"
                  />
                </div>

                {/* PHOTO URL */}

                <div>
                  <label
                    htmlFor="photoURL"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <Camera size={16} />
                    Profile Photo URL
                  </label>

                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-500"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Paste an image URL. Image upload will be added later.
                  </p>
                </div>

              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

          <form
            method="dialog"
            className="modal-backdrop"
            onSubmit={(event) => {
              event.preventDefault();
              handleCancel();
            }}
          >
            <button type="submit">close</button>
          </form>

        </dialog>
      )}

    </div>
  );
};

/* PROFILE INFO COMPONENT */

const ProfileInfo = ({ icon, label, value }) => {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-slate-700">
          {value || "Not provided"}
        </p>

      </div>

    </div>
  );
};

export default Profile;
