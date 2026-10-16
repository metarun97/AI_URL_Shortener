import { createBrowserRouter } from 'react-router';
import NotFound from '../pages/NotFound';
import App from '../App';
import Protected from '../features/Auth/components/Protected';
import Guest from '../features/Auth/components/Guest';
import SignIn from '../features/Auth/pages/SignIn';
import SignUp from '../features/Auth/pages/SignUp';
import Home from '../pages/Home';
import Dashboard from '../features/URL/pages/Dashboard';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Terms from '../pages/legal/Terms';
import Privacy from '../pages/legal/Privacy';


export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      /* ---- Guest components in guest Routes ---- */
      {
        element: <Guest />,
        children: [
          { path: '/signIn', element: <SignIn /> },
          { path: '/signUp', element: <SignUp /> },
        ],
      },
      /* ---- Protected components in protected Routes ---- */
      {
        element: <Protected />,
        children: [{ path: '/dashboard', element: <Dashboard /> }],
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
