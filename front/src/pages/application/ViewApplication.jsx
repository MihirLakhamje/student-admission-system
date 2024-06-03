import {
  approvalApplication,
  getApplication,
  myApplication,
} from "@/api/applications";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

export default function ViewApplication() {
  const { token } = useAuth();
  const { applicationId } = useParams();
  const [application, setApplication] = useState({});

  const {
    register,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  async function handleUpdateApplication(input) {
    try {
      await approvalApplication(applicationId, input, token);
      navigate("/applications");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    async function fetchApplication() {
      const { data } = await getApplication(applicationId, token);
      setApplication(() => data);
    }

    fetchApplication();
  }, []);
  return (
    <>
      {application ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-medium">
              {application?.student?.firstName}
            </h1>
            <p>Last name: {application?.student?.lastName}</p>
            <p>Email: {application?.student?.email}</p>
            <p>Phone: {application?.personalDetails?.phoneNumber}</p>
            <p>Programme: {application?.programme?.progTitle}</p>
            <p>Programme code: {application?.programme?.progCode}</p>
            <p className="text-lg font-semibold">
              Status: {application?.applicationStatus}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleUpdateApplication)}>
            <label className="form-control max-w-sm w-full">
              <div className="label">
                <span className="label-text">Degree Type</span>
              </div>
              <select
                className="select select-bordered"
                {...register("status")}
              >
                {/* "pending", "accepted", "rejected", "underReview" */}
                <option value={"accepted"}>approved</option>
                <option value={"pending"}>pending</option>
                <option value={"rejected"}>rejected</option>
                <option value={"underReview"}>under review</option>
              </select>
            </label>

            {/* Programme Title */}
            <label className="form-control max-w-sm w-full">
              <div className="label">
                <span className="label-text">Programme Title</span>
              </div>
              <input
                placeholder="e.g. Bachelor of Computer Science"
                className="input input-bordered"
                {...register("note")}
              />
            </label>
            <button className="btn btn-primary w-fit">Approval</button>
          </form>
        </>
      ) : (
        <h1>Application not found</h1>
      )}
    </>
  );
}
