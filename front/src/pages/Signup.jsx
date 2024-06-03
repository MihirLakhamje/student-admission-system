import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorLabel } from "@/components/CustomLabels";
import { Link } from "react-router-dom";

const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  localStorage.removeItem("authToken");
  const navigate = useNavigate();

  const { signupAction } = useAuth();

  async function handleSignup(data) {
    // e.preventDefault();
    try {
      await signupAction(data);
      navigate("/login");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <>
      <div className="h-full flex items-center justify-center p-2">
        <div className="card max-w-md w-full bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <h2 className="card-title">Wellcome, back!</h2>
            <form
              onSubmit={handleSubmit(handleSignup)}
              className="flex flex-col gap-4"
            >
              {/* First name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  placeholder="Applicant's first name"
                  className="input input-bordered w-full"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <ErrorLabel message={errors.firstName.message} />
                )}
              </label>

              {/* Last name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last name</span>
                </div>
                <input
                  placeholder="Applicant's last name"
                  className="input input-bordered w-full"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <ErrorLabel message={errors.lastName.message} />
                )}
              </label>

              {/* Email */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  placeholder="Email address"
                  className="input input-bordered w-full"
                  {...register("email")}
                />
                {errors.email && <ErrorLabel message={errors.email.message} />}
              </label>

              {/* Password */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  placeholder="Password"
                  className="input input-bordered w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <ErrorLabel message={errors.password.message} />
                )}
              </label>

              <label className="form-control w-fit">
                <Link to="/signup" className="text-xs hover:underline ">
                  Create an account?
                </Link>
              </label>

              <label className="form-control w-full">
                <button className="btn btn-primary" type="submit">
                  Signup
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
