import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ isAuthenticated, loading }) => {
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;
