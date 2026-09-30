// import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { getMeThunk } from './features/Auth/authThunk';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  /* User set in redux state */
  useEffect(() => {
    const setCurrentUser = async () => {
      await dispatch(getMeThunk()).unwrap();
    };
    setCurrentUser();
  }, []);

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
