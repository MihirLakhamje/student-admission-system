import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorLabel } from "@/components/CustomLabels";
import { Link } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  localStorage.removeItem("authToken");
  const navigate = useNavigate();

  const { loginAction } = useAuth();

  async function handleLogin(data) {
    // e.preventDefault();
    try {
      await loginAction(data);
      navigate("/");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <>
      <div className="h-full flex items-center justify-center p-2">
        <div className="card max-w-md w-full bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <h2 className="card-title">Wellcome, back!</h2>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
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
                <Link to="/forgotpassword" className="text-xs hover:underline">Forgot password?</Link>
              </label>
              <label className="form-control w-fit">
                <Link to="/signup" className="text-xs hover:underline ">Create an account?</Link>
              </label>
              <label className="form-control w-full">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
