import { useAuth } from "@/context/AuthProvider";
import { Link, useLocation } from "react-router-dom";

export function Item({ toLoc, title }) {
  const location = useLocation();
  let isActive = location.pathname === toLoc;
  return (
    <li className="p-0">
      <Link
        className={`${isActive ? "active" : ""} font-medium btn-link no-underline hover:no-underline`}
        to={toLoc}
      >
        {title}
      </Link>
    </li>
  );
}

export function NavLinks() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user?.role === "admin") {
    return (
      <>
        <Item toLoc="/" title="Home" />
        <Item toLoc="/programmes" title="All Programmes" />
        <Item toLoc="/applications" title="Applications" />
        <Item toLoc="/manage-users" title="Users Management" />
      </>
    );
  } else if (isAuthenticated && user?.role === "user") {
    return (
      <>
        <Item toLoc="/" title="Home" />
        <Item toLoc="/programmes" title="All Programmes" />
        <Item toLoc="/application" title="Create Application" />
        <Item toLoc="/about" title="About Us" />
        <Item toLoc="/contact" title="Contact Us" />
      </>
    );
  } else {
    return (
      <>
        <Item toLoc="/programmes" title="All Programmes" />
        <Item toLoc="/about" title="Applications" />
        <Item toLoc="/contact" title="Contact Us" />
        <Item toLoc="/about" title="About Us" />
      </>
    );
  }
}
