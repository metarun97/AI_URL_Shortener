/* Impoted items */
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './features/Auth/store/store';
import { RouterProvider } from 'react-router';
import { router } from './routes/App.routes';
import { ToastContainer } from 'react-toastify';
import './index.css';
// import App from './App';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>,
);
