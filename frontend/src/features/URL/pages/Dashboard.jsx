import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUrlThunk } from '../urlThunk';
import { toast } from 'react-toastify';
import { getAllUrlsThunk } from '../urlThunk';
import UrlList from '../components/UrlList';

const Dashboard = () => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const { urlLoading, error } = useSelector((state) => state.urls);

  /* Crete url handler */
  const createUrlHandler = async (data) => {
    try {
      await dispatch(createUrlThunk(data)).unwrap();
      toast.success('URL Creation Success!');
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  /* Get a perticuler user's all URLS */
  useEffect(() => {

    const getAllUrlsHandler = async () => {
      await dispatch(getAllUrlsThunk()).unwrap();
    };

    getAllUrlsHandler();

    window.addEventListener('focus', getAllUrlsHandler);

    return () => {
      window.removeEventListener('focus', getAllUrlsHandler);
    };

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
              disabled={urlLoading}
              className={`shrink-0 rounded-lg bg-teal-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-300 cursor-pointer ${urlLoading && 'animate-pulse'}`}
            >
              {urlLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>

        {/* URL List component */}
        <UrlList />
      </div>
    </div>
  );
};
export default Dashboard;
