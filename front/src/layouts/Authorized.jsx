/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthProvider";
import Loading from "@/components/Loading";

export default function Authorized({allowedRoles}) {
  const {isAuthenticated, user} = useAuth();

  if(isAuthenticated && user === null){
    return <Loading/>
  }

  // User is authenticated, render the protected route content
  if (isAuthenticated && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
