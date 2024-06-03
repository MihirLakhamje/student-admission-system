import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorLabel } from "@/components/CustomLabels";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthProvider";
import { Edit, Eye, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import { createApplication, getAllApplicaitons } from "@/api/applications";

export default function ViewAllApplications() {
  const { user, isAuthenticated, token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch applications
  useEffect(() => {
    async function fetchApplications() {
      try {
        const { data } = await getAllApplicaitons(currentPage, token);
        setApplications(data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchApplications();
  }, [currentPage]);

  return (
    <>
      <div className="overflow-x-auto mb-2 mt-2">
        <table className="table table-sm md:table-md table-zebra">
          <thead className="text-lg md:text-xl">
            <tr>
              <th>Sr. no.</th>
              <th>First name</th>
              <th>Programme title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.applications &&
              applications?.applications.map((application, index) => (
                <tr key={application._id}>
                  <th>{index + 1}</th>
                  <td>{application?.student?.firstName}</td>
                  <td>{application?.programme?.progTitle}</td>
                  <td>{application?.applicationStatus}</td>
                  <td className="flex gap-5">
                    <Link
                      to={`/applications/${application._id}`}
                      className="btn btn-xs btn-circle btn-ghost"
                      title="View"
                    >
                      <Eye size={20} className="text-green-500" />
                    </Link>
                    <Link
                      className="btn btn-xs btn-circle btn-ghost"
                      title="Delete"
                      to={`/applications/${application?._id}/delete`}
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={applications?.metaData?.totalCount}
        pageSize={applications?.metaData?.pageSize}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(() => page)}
      />
    </>
  );
}
