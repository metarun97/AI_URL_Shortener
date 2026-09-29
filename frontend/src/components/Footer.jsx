import { Link } from 'react-router';

const Footer = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Create URL', href: '/create' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  const linkClass =
    'text-sm text-slate-500 transition hover:text-teal-800 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 rounded-sm ' +
    'dark:text-slate-400 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300';

  return (
    <footer className="border-t border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand + tagline */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              to={"/"}
              className="text-lg font-semibold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800 dark:text-slate-50 dark:focus-visible:outline-teal-300"
            >
              AI<span className="text-teal-800 dark:text-teal-300">_</span>URL
              <span className="text-teal-800 dark:text-teal-300">_</span>
              Shortener
            </Link>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Shorten links and know they're safe before you share them.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.8125rem] font-medium text-slate-500 dark:text-slate-400">
                {col.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {year} AI_URL_Shortener. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to={'https://github.com/metarun97'}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-400 transition hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 rounded-sm dark:text-slate-500 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
              </svg>
            </Link>
            <Link
              to={"https://mail.google.com/mail/u/0/?view=cm&fs=1&to=metarun97@gmail.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 rounded-sm dark:text-slate-500 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m4 6 8 7 8-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
