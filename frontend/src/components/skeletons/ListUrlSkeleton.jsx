
const ListUrlSkeleton = () => {
  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="animate-pulse px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: URL details */}
            <div className="min-w-0 flex-1 space-y-3">
              {/* Original URL */}
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />

              {/* Short URL */}
              <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />

              {/* Clicks and risk badges */}
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* AI reason */}
              <div className="h-3 w-full max-w-md rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Right: Copy and Delete buttons */}
            <div className="flex shrink-0 gap-2 sm:flex-col">
              <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListUrlSkeleton;
