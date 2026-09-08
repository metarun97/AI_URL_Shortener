import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUsersUrls } from '../../utils/usersUrls';
import { useState } from 'react';
import { baseUrlForUrls } from '../../config/config';
import { FiCheck, FiCopy, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { CalendarDays, Link2, MousePointerClick } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import UrlSkeleton from '../skeleton/UrlSkeleton';
import { deleteSingleUrl } from '../../apis/userUrl.api';
import { toast } from 'react-toastify';

const UserUrls = () => {
  const [copiedId, setCopiedId] = useState(null);
  const { data, isLoading, isError, error } = useUsersUrls();
  const queryClient = useQueryClient();

  /* Copy to clipboard */
  const copyToClipboard = async (shortUrl, id) => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  /* Delete a single url */
  const deleteUrlHandler = async (urlId) => {
    // console.log(data);
    await deleteSingleUrl(urlId);
    queryClient.invalidateQueries({ queryKey: ['user-urls'] });

    toast.success('Url deleted successfully', { autoClose: 950 });
  };

  /* If loading then show skeleton loader or user urls */
  if (isLoading) {
    return <UrlSkeleton />;
  }

  /* If error then show error */
  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        {error?.response?.data?.message || 'Something went wrong'}
      </div>
    );
  }

  const urls = data?.urls || [];

  // console.log(urls);
  /* If length is zero of url array */
  if (data.urls.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No URLs created yet.
      </div>
    );
  }

  return (
    <section className="relative min-h-auto rounded-xl overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 md:px-6">
      {/* Background Blur */}
      <div className="absolute -top-32 left-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl ">
        {/* Header */}
        <div className="mb-8 ">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500">
              <Link2 className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                My Short URLs
              </h1>

              <p className="text-sm text-slate-400">
                Manage and track all your shortened links
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur-xl md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70">
                  <th className="p-5 text-left text-sm font-semibold text-slate-300">
                    Original URL
                  </th>

                  <th className="p-5 text-center text-sm font-semibold text-slate-300">
                    Clicks
                  </th>

                  <th className="p-5 text-center text-sm font-semibold text-slate-300">
                    Created
                  </th>

                  <th className="p-5 text-left text-sm font-semibold text-slate-300">
                    Short URL
                  </th>
                  <th className="p-5 text-center text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.urls.map((url) => {
                  const shortUrl = `${baseUrlForUrls}/${url.shortCode}`;

                  return (
                    <tr
                      key={url._id}
                      className="border-b border-slate-800/70 transition hover:bg-slate-800/30"
                    >
                      {/* Original URL */}
                      <td className="max-w-md p-5">
                        <Link
                          to={url.originalUrl}
                          target="_blank"
                          className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
                        >
                          <span className="truncate">{url.originalUrl}</span>

                          <FiExternalLink className="shrink-0" />
                        </Link>
                      </td>

                      {/* Clicks */}
                      <td className="p-5 text-center">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-400">
                          <MousePointerClick size={16} />
                          {url.clicks}
                        </div>
                      </td>

                      {/* Created */}
                      <td className="p-5 text-center">
                        <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                          <CalendarDays size={16} />

                          {new Date(url.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Short URL */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <Link
                            to={shortUrl}
                            target="_blank"
                            className="min-w-0 flex-1 truncate text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
                          >
                            {shortUrl}
                          </Link>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(shortUrl, url._id)}
                            className="flex shrink-0 items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-400 transition hover:bg-indigo-500/20 cursor-pointer"
                          >
                            {copiedId === url._id ? (
                              <>
                                <FiCheck />
                                Copied!
                              </>
                            ) : (
                              <>
                                <FiCopy />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                      {/* Actions */}
                      <td className="p-5 text-center">
                        <button
                          type="button"
                          onClick={() => deleteUrlHandler(url?._id)}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {data.urls.map((url) => {
            const shortUrl = `${baseUrlForUrls}/${url.shortCode}`;

            return (
              <div
                key={url._id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl backdrop-blur-xl"
              >
                {/* Original URL */}
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Original URL
                  </p>

                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 break-all text-sm text-indigo-400"
                  >
                    {url.full_url}

                    <FiExternalLink className="mt-1 shrink-0" />
                  </a>
                </div>

                {/* Stats */}
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                      <MousePointerClick size={14} />
                      Clicks
                    </div>

                    <p className="font-semibold text-white">{url.clicks}</p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                      <CalendarDays size={14} />
                      Created
                    </div>

                    <p className="font-semibold text-white">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Short URL */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Short URL
                  </p>

                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 block break-all rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-sm font-medium text-cyan-400"
                  >
                    {shortUrl}
                  </a>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(shortUrl, url._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.01] hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    {copiedId === url._id ? (
                      <>
                        <FiCheck />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        Copy URL
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserUrls;
