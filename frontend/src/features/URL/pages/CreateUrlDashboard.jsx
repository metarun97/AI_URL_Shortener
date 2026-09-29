import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUrlThunk } from '../urlThunk';
import { toast } from 'react-toastify';
import { getAllUrlsThunk } from './../urlThunk';
import UrlList from '../components/UrlList';
import { LuLoader } from 'react-icons/lu';

const CreateUrlDashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.urls);

  /* Crete url henadler */
  const createUrlHandler = async (data) => {
    try {
      await dispatch(createUrlThunk(data)).unwrap();
      // console.log(resdata);
      toast.success('URL Creation Success!');
      reset();
    } catch (error) {
      // console.log('Error to generate URL:', error);
      console.error(error);
    }
  };

  /* Get a perticuler user's all URLS */
  useEffect(() => {
    const getAllUrlsHandler = async () => {
      await dispatch(getAllUrlsThunk()).unwrap();
    };
    getAllUrlsHandler();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-200 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Heading + intro */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Shorten a URL
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Paste a long link below. Every URL is scanned for safety before it's
            shortened, so you know what you're sharing.
          </p>
        </div>

        {/* Create urls form */}
        <form
          onSubmit={handleSubmit(createUrlHandler)}
          className="rounded-2xl border border-slate-300 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-7"
        >
          <label
            htmlFor="url"
            className="mb-1.5 block text-[0.8125rem] font-medium text-slate-500 dark:text-slate-400"
          >
            Long URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="originalUrl"
              type="url"
              placeholder="Enter your long url..."
              {...register('originalUrl')}
              className="w-full flex-1 border-0 border-b border-slate-300 bg-transparent py-2 text-[0.95rem] text-slate-900 placeholder:text-slate-400 focus:border-teal-800 focus:shadow-[0_1px_0_0_var(--color-teal-800)] focus:outline-none dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-teal-300 dark:focus:shadow-[0_1px_0_0_var(--color-teal-300)]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`shrink-0 rounded-lg bg-teal-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-300 cursor-pointer`}
            >
              {isLoading && <LuLoader className="animate-spin text-xl" />}
              {!isLoading && 'Create'}
            </button>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="mt-2 min-h-[1.2em] text-sm text-center text-red-700 dark:text-red-300"
          >
            {error}
          </p>
        </form>

        {/* URL List component */}
        <UrlList />
      </div>
    </div>
  );
};
export default CreateUrlDashboard;

{
  /* <div className="mt-6 rounded-2xl border border-slate-300 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
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
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"> */
}
{
  /* Left: URL details */
}
// <div className="min-w-0 flex-1">
//   <p className="truncate text-sm text-slate-500 dark:text-slate-400">
//     {url?.originalUrl}
//   </p>
//   <Link
//     to={`http://localhost:3000/api/url/${url?.shortCode}`}
//     target="_blank"
//     rel="noreferrer"
//     className="mt-0.5 inline-block truncate text-sm font-medium text-teal-800 hover:underline dark:text-teal-300"
//   >
//     {url?.shortCode}
//   </Link>

//   <div className="mt-2 flex flex-wrap items-center gap-2">
//     <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
//       {url?.clicks} clicks
//     </span>

//     <span
//       className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${riskStyles[url?.risk] || riskStyles?.low}`}
//     >
//       {url.isUrlSafe ? 'Safe' : 'Unsafe'} · {url.risk} risk
//     </span>
//   </div>

//   <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
//     {url?.aiReason}
//   </p>
// </div>

{
  /* Right: actions */
}
{
  /* <div className="flex shrink-0 gap-2 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => copyHander(url)}
                        className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-800 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-300 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300 cursor-pointer"
                      >
                        {copiedId === url.id ? 'Copied' : 'Copy'}
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
        </div> */
}
