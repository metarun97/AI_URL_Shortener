import { createBrowserRouter } from 'react-router';
import NotFound from '../pages/NotFound';
import App from '../App';
import Protected from '../features/Auth/components/Protected';
import Guest from '../features/Auth/components/Guest';
import SignIn from '../features/Auth/pages/SignIn';
import SignUp from '../features/Auth/pages/SignUp';
import CreateUrlDashboard from '../features/URL/pages/CreateUrlDashboard';
import Home from '../components/Home';


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
        children: [{ path: '/urldashboard', element: <CreateUrlDashboard /> }],
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
