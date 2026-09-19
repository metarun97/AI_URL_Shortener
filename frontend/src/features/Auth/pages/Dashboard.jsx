import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user);

  if (loading) {
    return (
      <main>
        <div className="bg-slate-800 w-full min-h-screen flex justify-center items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <div className="bg-slate-800 w-full min-h-screen flex justify-center items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
        </div>
      </main>
    );
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
