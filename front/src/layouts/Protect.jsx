import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loading from "@/components/Loading";

const ProtectedRoute = () => {
  const {isAuthenticated, user, token} = useAuth();
  if(token && user === null){
    return <Loading />
  }

  // User is authenticated, render the protected route content
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
