import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role === "admin") {
    return <></>;
  } else if (isAuthenticated && user?.role === "user") {
    return (
      <>
        <h1>Hello! {user?.firstName}</h1>
        <h2>Important notice & Instructions</h2>
        <ol type="1">
          <li>Admissions are open now</li>
          <li>
            Create application: <Link to={"/application"} className="btn btn-link">Application</Link>.
          </li>
          <li>
            After creating application, upload documents:{" "}
            <Link to={"/application/upload"} className="btn btn-link">Upload Documents</Link>.
          </li>
          <li>
            View your application:{" "}
            <Link to={"/application/view"} className="btn btn-link">View Application</Link>.
          </li>
        </ol>
      </>
    );
  } else {
    return <></>;
  }
}
