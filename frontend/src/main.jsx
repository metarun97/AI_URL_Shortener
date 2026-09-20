/* Impoted items */
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes/App.routes';
import { ToastContainer } from 'react-toastify';
import './index.css';
// import App from './App';
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>,
);
