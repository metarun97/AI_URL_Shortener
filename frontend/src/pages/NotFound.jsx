import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 p-6 dark:bg-slate-950">
      <div className="w-full max-w-sm rounded-2xl border border-slate-300 bg-white px-8 py-10 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-medium tracking-wide text-teal-800 dark:text-teal-300">
          404
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Page not found
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={"/"}
            className="w-full rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:w-auto dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-300"
          >
            Go home
          </Link>

          <Link
            to={"/dashboard"}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-teal-800 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 sm:w-auto dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-300 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300"
          >
            Dashboard
          </Link>
        </div>

        <p className="mt-7 border-t border-slate-200 pt-5 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Wrong link?
          <Link
            to={"#"}
            className="font-medium text-teal-800 hover:underline dark:text-teal-300"
          >
            Report it
          </Link>
        </p>
      </div>
    </div>
  );
}
