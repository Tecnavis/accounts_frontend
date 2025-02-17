import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ isAuthenticated }) => {
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login2" />;
// };


const ProtectedRoute = ({ isAuthenticated }) => {
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login2" replace />;
};
export default ProtectedRoute;