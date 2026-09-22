import { useDispatch } from 'react-redux';
import { data, Outlet } from 'react-router';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { getMeThunk } from './features/Auth/authThunk';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAndSetCurrentUser();
  }, [dispatch]);

  const getAndSetCurrentUser = async () => {
    const data = await dispatch(getMeThunk()).unwrap();
    // console.log(data);
  };

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
