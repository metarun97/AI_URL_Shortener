import { createBrowserRouter } from 'react-router';
import Login from '../features/Auth/pages/Login';
import Register from './../features/Auth/pages/Register';
import Dashboard from './../features/Auth/pages/Dashboard';
import Protected from '../features/Auth/components/Protected';
import NotFound from '../pages/NotFound';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      /* Protected Route */
      {
        element: <Protected />,
        children: [{ path: '/dashboard', element: <Dashboard /> }],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
