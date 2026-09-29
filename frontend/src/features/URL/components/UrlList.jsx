import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUrlThunk } from '../urlThunk';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const riskStyles = {
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900',
  medium:
    'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900',
  high: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-900',
};

const UrlList = () => {
  const [copiedId, setCopiedId] = useState(null);
  const { urls, loading } = useSelector((state) => state.urls);
  const dispatch = useDispatch();
  console.log(urls);

  /* Handle copy function */
  const copyHandler = async (url) => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/api/url/${url?.shortCode}`,
      );

      setCopiedId(url?._id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.log('Could not copy to clipboard.', error);
    }
  };

  /* Handle delete function */
  const deleteHandler = async (id) => {
    await dispatch(deleteUrlThunk(id)).unwrap();
    toast.success('URL deleted!');
  };

  return (
    <>
      {/* All URLs List */}
      <div className="mt-6 rounded-2xl border border-slate-300 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Your URLs
          </h2>
        </div>

        {urls.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            No URLs yet. Create one above to get started.
          </p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {urls.map((url) => (
              <li key={url?.shortCode} className="px-6 py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: URL details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                      {url?.originalUrl}
                    </p>
                    <Link
                      to={`http://localhost:3000/api/url/${url?.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-0.5 inline-block truncate text-sm font-medium text-teal-800 hover:underline dark:text-teal-300"
                    >
                      {`http://localhost:3000/api/url/${url?.shortCode}`}
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {url?.clicks} clicks
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${riskStyles[url?.risk] || riskStyles?.low}`}
                      >
                        {url.isUrlSafe ? 'Safe' : 'Unsafe'} · {url.risk} risk
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {url?.aiReason}
                    </p>
                  </div>

                  {/* Right: actions */}
                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    <button
                      type="button"
                      onClick={() => copyHandler(url)}
                      className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-800 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-300 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300 cursor-pointer"
                    >
                      {copiedId === url?._id ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHandler(url?._id)}
                      className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-red-700 transition hover:border-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 dark:border-slate-700 dark:text-red-300 dark:hover:border-red-300 dark:focus-visible:outline-red-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UrlList;
