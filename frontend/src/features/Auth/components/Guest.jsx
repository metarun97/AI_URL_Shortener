import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';


/* Guest Route */
const Guest = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return <Outlet />;
};

export default Guest;
