import { useDebugValue, useEffect, useState } from 'react';
import { getStats } from '../apis/stats.api';

// const STATS = [
//   {
//     label: 'Total Users',
//     value: '12,480',
//     icon: (
//       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//     ),
//   },
//   {
//     label: 'URLs Created',
//     value: '58,932',
//     icon: (
//       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//     ),
//   },
//   {
//     label: 'Links Clicked',
//     value: '3.2M',
//     icon: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" strokeLinejoin="round" />,
//   },
// ];

const Home = () => {
  // const { urls } = useSelector((state) => state.urls);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUrls: 0,
    totalClicks: 0,
  });

  const showStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.log('Fail to fetch stats:', error);
    }
  };

  useEffect(() => {
    showStats();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-200 dark:bg-slate-950">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgb(148 163 184 / 0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 90%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-32 h-112 w-2xl -translate-x-1/2 rounded-full bg-teal-400/30 blur-[110px] dark:bg-teal-500/20"
      />

      <div className="relative px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-800/20 bg-teal-800/5 px-3.5 py-1 text-xs font-medium text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-300">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="m5 12 5 5L20 7" />
            </svg>
            AI-powered safety scans on every link
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
            Shorten links.
            <br />
            <span className="bg-linear-to-r from-teal-700 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-300 dark:via-teal-200 dark:to-cyan-300">
              Know they're safe.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Every link on this platform is scanned before it's shared, so you
            and the people who click your links can trust what's on the other
            side.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Users card */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-300 bg-white/80 px-7 py-9 text-center shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl transition group-hover:bg-teal-400/20 dark:bg-teal-300/10"
            />

            <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-md shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                }
              </svg>
            </div>

            <p className="relative mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {stats.totalUsers}
            </p>
            <p className="relative mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Total Users
            </p>
          </div>

          {/* Total Urls */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-300 bg-white/80 px-7 py-9 text-center shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl transition group-hover:bg-teal-400/20 dark:bg-teal-300/10"
            />

            <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-md shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                }
              </svg>
            </div>

            <p className="relative mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {stats?.totalUrls}
            </p>
            <p className="relative mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Total Urls
            </p>
          </div>

          {/* Total Clicks */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-300 bg-white/80 px-7 py-9 text-center shadow-xl backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/80">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl transition group-hover:bg-teal-400/20 dark:bg-teal-300/10"
            />

            <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-md shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {
                  <path
                    d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"
                    strokeLinejoin="round"
                  />
                }
              </svg>
            </div>

            <p className="relative mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              {stats?.totalClicks}
            </p>
            <p className="relative mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Total Clicks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
