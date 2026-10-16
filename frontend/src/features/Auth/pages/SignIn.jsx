import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { signInThunk } from '../authThunk';
import { useState } from 'react';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Login handler function */
  const signInHandler = async (data) => {
    try {
      await dispatch(signInThunk(data)).unwrap();
      toast.success('SignIn Success!');
      reset();
      navigate('/dashboard');
    } catch (error) {
      toast.error(error);
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
          onSubmit={handleSubmit(signInHandler)}
          className="w-full max-w-sm rounded-2xl border border-slate-300 bg-white px-8 pb-7 pt-9 shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <h1 className="mb-1.5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Sign In
          </h1>
          <p className="mb-7 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Use email & password to SignIn.
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
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Enter passoword..."
              className={inputClass}
              {...register('password')}
            />

            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
                className="accent-teal-800 dark:accent-teal-300"
              />
              Show password
            </label>
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
            className="mt-4 min-h-[1.2em] text-sm text-center text-red-700 dark:text-red-300"
          >
            {error}
          </p>

          <p className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Dont' have an accout?
            <Link
              to={'/signup'}
              className="font-medium text-teal-800 hover:underline dark:text-teal-300"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
