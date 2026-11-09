import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  IdCard,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  Save,
  X,
  BadgeCheck,
} from "lucide-react";

const AdminProfile = () => {
  // Temporary admin data
  // Later this data will come from authentication/database
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@retrivo.com",
    phone: "01712345678",
    department: "Student Affairs",
    adminId: "ADM-001",
    role: "Administrator",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(admin);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open edit modal
  const handleEdit = () => {
    setFormData(admin);
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(admin);
    setIsEditing(false);
  };

  // Save profile
  const handleSave = (event) => {
    event.preventDefault();

    // Temporary
    // Later update this information in database
    setAdmin(formData);

    setIsEditing(false);

    console.log("Updated Admin Profile:", formData);
  };

  // Generate initials
  const initials = admin.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-5xl">

      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Admin Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your administrator account information.
            </p>
          </div>

        </div>

      </div>

      {/* =========================================
          PROFILE HEADER
      ========================================== */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        {/* Cover */}

        <div className="h-28 bg-slate-100" />

        {/* Profile */}

        <div className="px-5 pb-6 sm:px-6">

          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            {/* Avatar + Name */}

            <div className="flex items-end gap-4">

              <div
                className="
                  flex
                  h-24
                  w-24
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-white
                  bg-slate-800
                  text-2xl
                  font-bold
                  text-white
                  shadow-sm
                "
              >
                {initials}
              </div>

              <div className="pb-1">

                <div className="flex items-center gap-2">

                  <h2 className="text-xl font-bold text-slate-800">
                    {admin.name}
                  </h2>

                  <BadgeCheck
                    size={18}
                    className="text-slate-500"
                  />

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {admin.role}
                </p>

              </div>

            </div>

            {/* Edit Button */}

            <button
              type="button"
              onClick={handleEdit}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-600
                transition
                hover:bg-slate-100
              "
            >
              <Pencil size={16} />
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      {/* =========================================
          INFORMATION SECTION
      ========================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Personal Information */}

        <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2">

          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

            <h2 className="font-semibold text-slate-800">
              Administrator Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Basic information about the administrator account.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">

            <ProfileInfo
              icon={<User size={17} />}
              label="Full Name"
              value={admin.name}
            />

            <ProfileInfo
              icon={<Mail size={17} />}
              label="Email Address"
              value={admin.email}
            />

            <ProfileInfo
              icon={<Phone size={17} />}
              label="Phone Number"
              value={admin.phone}
            />

            <ProfileInfo
              icon={<Building2 size={17} />}
              label="Department"
              value={admin.department}
            />

            <ProfileInfo
              icon={<IdCard size={17} />}
              label="Admin ID"
              value={admin.adminId}
            />

            <ProfileInfo
              icon={<ShieldCheck size={17} />}
              label="Role"
              value={admin.role}
            />

          </div>

        </div>

        {/* Account Information */}

        <div className="rounded-xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-5 py-5">

            <h2 className="font-semibold text-slate-800">
              Account
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Administrator account status.
            </p>

          </div>

          <div className="space-y-3 p-5">

            {/* Status */}

            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-white">
                  Active
                </span>

              </div>

            </div>

            {/* Role */}

            <div className="rounded-lg bg-slate-50 p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Access
                </span>

                <span className="text-sm font-medium text-slate-700">
                  Administrator
                </span>

              </div>

            </div>

            {/* Change Password */}

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                border
                border-slate-200
                p-4
                text-left
                transition
                hover:bg-slate-50
              "
            >
              <LockKeyhole
                size={18}
                className="text-slate-500"
              />

              <div>

                <p className="text-sm font-medium text-slate-700">
                  Change Password
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Update your admin password
                </p>

              </div>

            </button>

          </div>

        </div>

      </div>

      {/* =========================================
          EDIT PROFILE MODAL
      ========================================== */}

      {isEditing && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle"
        >

          <div className="modal-box max-w-2xl p-0">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>

                <h3 className="text-lg font-semibold text-slate-800">
                  Edit Admin Profile
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Update your administrator information.
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

            {/* Form */}

            <form onSubmit={handleSave}>

              <div className="space-y-5 p-5 sm:p-6">

                {/* Name */}

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
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-slate-500
                    "
                  />

                </div>

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-slate-500
                    "
                  />

                </div>

                {/* Phone */}

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
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-slate-500
                    "
                  />

                </div>

                {/* Department */}

                <div>

                  <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Department
                  </label>

                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-slate-500
                    "
                  />

                </div>

                {/* Admin ID */}

                <div>

                  <label
                    htmlFor="adminId"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Admin ID
                  </label>

                  <input
                    id="adminId"
                    name="adminId"
                    type="text"
                    value={formData.adminId}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      py-3
                      text-sm
                      text-slate-700
                      outline-none
                      focus:border-slate-500
                    "
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-600
                    hover:bg-slate-100
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-slate-800
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    hover:bg-slate-700
                  "
                >
                  <Save size={16} />
                  Save Changes
                </button>

              </div>

            </form>

          </div>

          {/* Backdrop */}

          <form
            method="dialog"
            className="modal-backdrop"
            onSubmit={(event) => {
              event.preventDefault();
              handleCancel();
            }}
          >
            <button type="submit">
              close
            </button>
          </form>

        </dialog>
      )}

    </div>
  );
};

/* =========================================
   PROFILE INFO COMPONENT
========================================== */

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
          {value}
        </p>

      </div>

    </div>
  );
};

export default AdminProfile;