import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorLabel } from "@/components/CustomLabels";
import { useAuth } from "@/context/AuthProvider";
import { Edit, Eye, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import { addMoneyComa } from "@/lib/addMoneyComa";
import Loading from "@/components/Loading";
import {
  addProgramme,
  deleteProgramme,
  getAllProgrammes,
  getProgramme,
  updateProgramme,
} from "@/api/programmes";

const programmeSchema = yup.object().shape({
  progTitle: yup.string().required("Programme title is required"),
  progCode: yup.string().required("Programme code is required"),
  duration: yup.number().required("Duration is required"),
  description: yup.string(),
  degreeType: yup.string().required("Degree type is required"),
  overallFees: yup.number().required("Overall fees is required"),
});

export function GetAllProgramme() {
  const { user, isAuthenticated } = useAuth();
  const [programmes, setProgrammes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // fetch programmes
  useEffect(() => {
    async function fetchProgrammes() {
      try {
        const { data } = await getAllProgrammes(currentPage);
        setProgrammes(data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchProgrammes();
  }, [currentPage]);

  return (
    <>
      {isAuthenticated && user.role === "admin" && (
        <Link to="/programmes/create" className="btn btn-primary btn-sm">
          Add
        </Link>
      )}
      <div className="overflow-x-auto mb-2 mt-2">
        <table className="table table-sm md:table-md table-zebra">
          {/* head */}
          <thead className="text-lg md:text-xl">
            <tr>
              <th>Sr. no.</th>
              <th>Code</th>
              <th>Programme Title</th>
              <th>Overall Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {programmes.programmes &&
              programmes?.programmes.map((programme, index) => (
                <tr key={programme._id}>
                  <th>{index + 1}</th>
                  <td>{programme.progCode}</td>
                  <td>{programme.progTitle}</td>
                  <td>{programme.overallFees}</td>
                  <td className="flex gap-5">
                    <Link
                      to={`/programmes/${programme._id}`}
                      className="btn btn-xs btn-circle btn-ghost"
                      title="View"
                    >
                      <Eye size={20} className="text-green-500" />
                    </Link>
                    {isAuthenticated && user.role === "admin" && (
                      <>
                        <Link
                          className="btn btn-xs btn-circle btn-ghost"
                          title="Edit"
                          to={`/programmes/${programme?._id}/edit`}
                        >
                          <Edit size={20} className="text-blue-500" />
                        </Link>
                        <Link
                          className="btn btn-xs btn-circle btn-ghost"
                          title="Delete"
                          to={`/programmes/${programme?._id}/delete`}
                        >
                          <Trash2 size={20} className="text-red-500" />
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={programmes?.metaData?.totalCount}
        pageSize={programmes?.metaData?.pageSize}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(() => page)}
      />
    </>
  );
}

export function GetProgramme() {
  const { programmeId } = useParams();
  const [programme, setProgramme] = useState({});
  const { token } = useAuth();

  
  useEffect(() => {
    // fetch programme
    async function fetchProgramme() {
      try {
        const { data } = await getProgramme(token, programmeId);
        setProgramme(() => data);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    return () => {
      fetchProgramme();
    };
  }, [programmeId]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium">{programme?.progTitle}</h1>
        <p className="text-lg">Programme code: {programme?.progCode}</p>
        <p className="text-lg">Duration: {programme?.duration}</p>
        {programme?.description && (
          <p className="text-lg">Description: {programme?.description}</p>
        )}
        <p className="text-lg">
          Degree type:{" "}
          {programme?.degreeType === "UG"
            ? "Undergraduate"
            : "Postgraduate"}
        </p>
        <p className="text-lg">
          Overall fees: {addMoneyComa(programme.overallFees)}/-
        </p>
      </div>
    </>
  );
}

export function AddProgramme() {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(programmeSchema),
  });

  // add new Programme
  async function handleAddProgramme(data) {
    try {
      await addProgramme(data, token);
      alert("Programme added successfully");
      reset();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleAddProgramme)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Programme code */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Programme Code</span>
            </div>
            <input
              placeholder="e.g. ABC"
              className="input input-bordered w-full"
              {...register("progCode")}
            />
            {errors.progCode && (
              <ErrorLabel message={errors.progCode.message} />
            )}
          </label>

          {/* Programme Title */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Programme Title</span>
            </div>
            <input
              placeholder="e.g. Bachelor of Computer Science"
              className="input input-bordered w-full"
              {...register("progTitle")}
            />
            {errors.progTitle && (
              <ErrorLabel message={errors.progTitle.message} />
            )}
          </label>

          {/* Description */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              placeholder="Optional"
              className="input input-bordered w-full"
              {...register("description")}
            />
            {errors.description && (
              <ErrorLabel message={errors.description.message} />
            )}
          </label>

          {/* Duration */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Duration in Year</span>
            </div>
            <input
              placeholder="e.g. 4"
              className="input input-bordered w-full"
              {...register("duration")}
            />
            {errors.duration && (
              <ErrorLabel message={errors.duration.message} />
            )}
          </label>

          {/* Degree Type */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Degree Type</span>
            </div>
            <select
              className="select select-bordered"
              {...register("degreeType")}
            >
              <option value={"UG"}>Undergraduate</option>
              <option value={"PG"}>Postgraduate</option>
              <option value={"PHD"}>PhD</option>
            </select>
            {errors.degreeType && (
              <ErrorLabel message={errors.degreeType.message} />
            )}
          </label>

          {/* Overall Fees */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Overall Fees</span>
            </div>
            <input
              placeholder="e.g. 4"
              className="input input-bordered w-full"
              {...register("overallFees")}
            />
            {errors.overallFees && (
              <ErrorLabel message={errors.overallFees.message} />
            )}
          </label>
        </div>
        <button className="btn btn-primary mt-5" type="submit">
          Create
        </button>
      </form>
    </>
  );
}

export function UpdateProgramme() {
  const { token } = useAuth();
  const { programmeId } = useParams();
  const [programme, setProgramme] = useState(null);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // fetch Programme
  useEffect(() => {
    const fetchProgramme = async () => {
      try {
        const { data } = await getProgramme(token, programmeId);
        setProgramme(data);
      } catch (error) {
        throw new Error(error.message);
      }
    };

    fetchProgramme();
  }, [programmeId]);

  // update Programme
  const onSubmit = async (value) => {
    try {
      await updateProgramme(value, token, programmeId);
      navigate("/programmes");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      {programme ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Programme code */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Programme Code</span>
              </div>
              <input
                placeholder="e.g. ABC"
                className="input input-bordered w-full"
                defaultValue={programme.progCode}
                {...register("progCode")}
              />
            </label>

            {/* Programme Title */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Programme Title</span>
              </div>
              <input
                placeholder="e.g. Bachelor of Computer Science"
                className="input input-bordered w-full"
                defaultValue={programme.progTitle}
                {...register("progTitle")}
              />
            </label>

            {/* Description */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                placeholder="Optional"
                className="input input-bordered w-full"
                defaultValue={programme.description}
                {...register("description")}
              />
            </label>

            {/* Duration */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Duration in Year</span>
              </div>
              <input
                placeholder="e.g. 4"
                className="input input-bordered w-full"
                defaultValue={programme.duration}
                {...register("duration")}
              />
            </label>

            {/* Degree Type */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Degree Type</span>
              </div>
              <select
                className="select select-bordered"
                defaultValue={programme.degreeType}
                {...register("degreeType")}
              >
                <option value={"UG"}>Undergraduate</option>
                <option value={"PG"}>Postgraduate</option>
                <option value={"PHD"}>PhD</option>
              </select>
            </label>

            {/* Overall Fees */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Overall Fees</span>
              </div>
              <input
                placeholder="e.g. 4"
                className="input input-bordered w-full"
                defaultValue={programme.overallFees}
                {...register("overallFees")}
              />
            </label>
          </div>
          <button className="btn btn-primary mt-5" type="submit">
            Save and Continue
          </button>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
}

export function DeleteProgramme() {
  const { token } = useAuth();
  const { programmeId } = useParams();

  const navigate = useNavigate();

  const deleteProgrammeById = async () => {
    try {
      await deleteProgramme(token, programmeId);
      navigate("/programmes");
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    deleteProgrammeById();
  }, [])

  return (
    <>

    </>
  );
}
