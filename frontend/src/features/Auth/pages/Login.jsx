import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginThunk } from '../store/thunks/thunk';
import { toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );
  // console.log(user);

  const dispatch = useDispatch();
  const naviate = useNavigate();

  /* Login handler */
  const loginHandler = async ({ email, password }) => {
    try {
      const res = await dispatch(loginThunk({ email, password })).unwrap();
      console.log(res);

      toast.success("Login Sussess✅")
      reset();
      naviate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const inputClass =
    'w-full border-0 border-b border-slate-300 bg-transparent py-2 text-[0.95rem] ' +
    'text-slate-900 placeholder:text-slate-400 rounded-none ' +
    'focus:border-teal-800 focus:shadow-[0_1px_0_0_theme(colors.teal.800)] focus:outline-none ' +
    'dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 ' +
    'dark:focus:border-teal-300 dark:focus:shadow-[0_1px_0_0_theme(colors.teal.300)]';

  return (
    <main>
      <div className="flex min-h-screen items-center justify-center bg-slate-200 p-6 dark:bg-slate-950">
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="w-full max-w-sm rounded-2xl border border-slate-300 bg-white px-8 pb-7 pt-9 shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <h1 className="mb-1.5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Login Form
          </h1>
          <p className="mb-7 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Use the email & password for loggIn.
          </p>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-1.5 block text-[0.8125rem] font-medium text-slate-500 dark:text-slate-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Enter email address..."
              className={inputClass}
              {...register('email')}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-[0.8125rem] font-medium text-slate-500 dark:text-slate-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Enter passoword..."
              className={inputClass}
              {...register('password')}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-teal-800 px-4 py-2.5 text-[0.95rem] font-medium text-white transition hover:bg-teal-700 [focus-visible:outline] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-300 dark:text-teal-950 dark:hover:bg-teal-200 dark:focus-visible:outline-teal-300 cursor-pointer"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          {/* Login error field */}
          <p
            role="status"
            aria-live="polite"
            className="mt-4 min-h-[1.2em] text-sm text-red-700 dark:text-red-300"
          >
            {error}
          </p>

          <p className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Dont' have an accout?
            <Link
              to={'/register'}
              className="font-medium text-teal-800 hover:underline dark:text-teal-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
