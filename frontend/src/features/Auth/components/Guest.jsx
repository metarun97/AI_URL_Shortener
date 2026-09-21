import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';


const Guest = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={'/urldashboard'} replace />;
  }

  return <Outlet />;
};

export default Guest;
