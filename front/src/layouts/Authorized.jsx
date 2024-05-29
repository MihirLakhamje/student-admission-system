/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function Authorized({allowedRoles}) {
  const {isAuthenticated, user} = useAuth();

  if(isAuthenticated && user === null){
    return <h1>Loading..</h1>
  }

  // User is authenticated, render the protected route content
  if (isAuthenticated && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
