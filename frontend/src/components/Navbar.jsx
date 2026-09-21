import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { logoutThunk } from '../features/Auth/authThunk';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(user);

  const logoutHandler = async () => {
    await dispatch(logoutThunk()).unwrap();
    toast.success('Logged Out!');
  };

  const linkClass =
    'rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition ' +
    'hover:bg-slate-100 hover:text-teal-800 ' +
    'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-800 ' +
    'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300';

  const buttonClass =
    'ml-3 rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-800 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-300 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300 cursor-pointer';


  const Avatar = () =>
    user && (
      <img
        src={user?.avatar}
        alt={user?.username}
        className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
      />
    );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-300 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Link
          to={'/'}
          className="text-lg font-semibold tracking-tight text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800 dark:text-slate-50 dark:focus-visible:outline-teal-300"
        >
          AI<span className="text-teal-800 dark:text-teal-300">_</span>URL
          <span className="text-teal-800 dark:text-teal-300">_</span>Shortner
        </Link>

        {/* Desktop right side */}
        <div className="hidden items-center gap-1 md:flex">
          <Link className={linkClass} to={'/'}>
            Home
          </Link>

          {/* Links show according to user */}
          {user ? (
            <Link to={'/urldashboard'} className={linkClass}>
              UrlDashbord
            </Link>
          ) : (
            <div>
              <Link to={'/signIn'} className={buttonClass}>
                SignIn
              </Link>
              <Link to={'/signUp'} className={buttonClass}>
                SignUp
              </Link>
            </div>
          )}

          <div className="mx-3 h-8 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-2.5">
            <Avatar />
            <div className="leading-tight">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {user?.username}
              </p>
              <p className="max-w-48 truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>

          {user && (
            <button
              type="button"
              onClick={logoutHandler}
              className={buttonClass}
            >
              Log out
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 md:hidden dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:outline-teal-300"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 px-4 pb-4 pt-3 md:hidden dark:border-slate-800"
        >
          <div className="flex flex-col gap-1">
            <Link className={linkClass} to={'/'}>
              Home
            </Link>

            {/* Links show according to user */}
            {user ? (
              <Link to={'/urldashboard'} className={linkClass}>
                UrlDashbord
              </Link>
            ) : (
              <div>
                <Link to={'/signIn'} className={buttonClass}>
                  SignIn
                </Link>
                <Link to={'/signUp'} className={buttonClass}>
                  SignUp
                </Link>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2.5 border-t border-slate-200 pt-3 dark:border-slate-800">
            <Avatar />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {user?.username}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logoutHandler}
            className="mt-3 w-full rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-300 cursor-pointer"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
