import { Link, useRouteError } from "react-router";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 500;

  const statusMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Access Denied",
    404: "Page Not Found",
    500: "Internal Server Error",
  };

  const title = statusMessages[status] || "Something Went Wrong";

  const message =
    status === 404
      ? "The page you are looking for does not exist or may have been moved."
      : error?.statusText ||
        error?.message ||
        "Something went wrong. Please try again later.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <AlertTriangle
            size={40}
            className="text-slate-600"
          />
        </div>

        {/* Status */}
        <p className="text-7xl font-bold tracking-tight text-slate-800">
          {status}
        </p>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {title}
        </h1>

        {/* Message */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          {message}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <Home size={17} />
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
};

export default ErrorPage;