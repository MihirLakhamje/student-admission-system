import { useAuth } from "@/context/AuthProvider";
import { Link, useLocation, useParams } from "react-router-dom";

export function Item({ toLoc, title }) {
  const location = useLocation();

  let isActive = location.pathname === toLoc;
  return (
    <li className="p-0">
      <Link
        className={`${isActive ? "btn btn-neutral btn-sm" : "text-slate-900"} font-medium no-underline  hover:no-underline hover:bg-none`}
        to={toLoc}
      >
        {title}
      </Link>
    </li>
  );
}

export function NavLinks() {
  const { isAuthenticated, user } = useAuth();
  const { programmeId } = useParams();

  if (isAuthenticated && user?.role === "admin") {
    return (
      <>
        <Item toLoc="/" title="Home" />
        <Item toLoc={`/programmes`} title="Programmes" />
        <Item toLoc="/applications" title="Applications" />
        <Item toLoc="/manage-users" title="Manage Users" />
      </>
    );
  } else if (isAuthenticated && user?.role === "user") {
    return (
      <>
        <Item toLoc="/" title="Home" />
        <Item toLoc="/programmes" title="Programmes" />
        <Item toLoc="/application" title="Create Application" />
        <Item toLoc="/about" title="About Us" />
        <Item toLoc="/contact" title="Contact Us" />
      </>
    );
  } else {
    return (
      <>
        <Item toLoc="/programmes" title="Programmes" />
        <Item toLoc="/contact" title="Contact Us" />
        <Item toLoc="/about" title="About Us" />
      </>
    );
  }
}
