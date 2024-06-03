import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorLabel } from "@/components/CustomLabels";
import { useAuth } from "@/context/AuthProvider";
import { createApplication, myApplication } from "@/api/applications";
import { useEffect, useState } from "react";
import { getAllProgrammes } from "@/api/programmes";

const createApplicationSchema = yup.object({
  age: yup.number().required(),
  phoneNumber: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  zipCode: yup.string().required(),
  bloodGroup: yup.string().required(),
  gender: yup.string().required(),
  motherName: yup.string().required(),
  collegeName: yup.string().required(),
  boardName: yup.string().required(),
  percentage: yup.number().required(),
  progCode: yup.string().required(),
});
export default function CreateApplication() {
  const { user, isAuthenticated, token } = useAuth();
  const [programmes, setProgrammes] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createApplicationSchema),
  });

  async function handleCreateApplication(data) {
    try {
      await createApplication(data, token);

    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }


  useEffect(() => {
    async function fetchProgramme() {
      try {
        await myApplication(user._id,token);
        navigate("/application/upload")
      } catch (error) {
        throw new Error(error.message);
      }
    }
    async function fetchProgrammes() {
      try {
        const { data } = await getAllProgrammes(token);
        setProgrammes(data.programmes);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    return () => {
      fetchProgrammes();
      fetchProgramme();
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateApplication)} className="flex flex-col gap-10">
        {/* Personal Details start */}
        <section>
          <h2 className="text-2xl font-bold">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-5">
            {/* First name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">First name</span>
              </div>
              <input
                placeholder="e.g. ABC"
                className="input input-bordered w-full"
                defaultValue={user?.firstName || ""}
                disabled
              />
            </label>

            {/* Email */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                placeholder="e.g. Bachelor of Computer Science"
                className="input input-bordered w-full"
                defaultValue={user?.email || ""}
                disabled
              />
            </label>

            {/* Age */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                placeholder="Age in number"
                className="input input-bordered w-full"
                {...register("age")}
              />
              {errors.age && <ErrorLabel message={errors.age.message} />}
            </label>

            {/* Phone number */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Phone number</span>
              </div>
              <input
                placeholder="+91 1234567890"
                className="input input-bordered w-full"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <ErrorLabel message={errors.phoneNumber.message} />
              )}
            </label>

            {/* Blood Group */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Blood Group</span>
              </div>
              <input
                placeholder="e.g. B+"
                className="input input-bordered w-full"
                {...register("bloodGroup")}
              />
              {errors.bloodGroup && (
                <ErrorLabel message={errors.bloodGroup.message} />
              )}
            </label>

            {/* Gender */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select
                className="select select-bordered"
                {...register("gender")}
              >
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
              {errors.gender && <ErrorLabel message={errors.gender.message} />}
            </label>
          </div>
        </section>
        {/* Personal Details end */}

        {/* Address Details start */}
        <section>
          <h2 className="text-2xl font-bold">Address Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-5">
            {/* Country */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Country</span>
              </div>
              <select
                className="select select-bordered"
                {...register("country")}
              >
                <option value={"india"}>India</option>
              </select>
              {errors.country && (
                <ErrorLabel message={errors.country.message} />
              )}
            </label>

            {/* State */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">State</span>
              </div>
              <select className="select select-bordered" {...register("state")}>
                <option value={"maharastra"}>Maharashtra</option>
              </select>
              {errors.state && <ErrorLabel message={errors.state.message} />}
            </label>

            {/* City */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">City</span>
              </div>
              <select className="select select-bordered" {...register("city")}>
                <option value={"mumbai"}>Mumbai</option>
              </select>
              {errors.city && <ErrorLabel message={errors.city.message} />}
            </label>

            {/* Zip code */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Zip code</span>
              </div>
              <input
                placeholder="e.g. 400022"
                className="input input-bordered w-full"
                {...register("zipCode")}
              />
              {errors.zipCode && (
                <ErrorLabel message={errors.zipCode.message} />
              )}
            </label>
          </div>
        </section>
        {/* Address Details end */}

        {/* Academic Details start */}
        <section>
          <h2 className="text-2xl font-bold">Academic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-5">
            {/* mother name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Mother name</span>
              </div>
              <input
                placeholder="e.g. mansi"
                className="input input-bordered w-full"
                {...register("motherName")}
              />
              {errors.motherName && (
                <ErrorLabel message={errors.motherName.message} />
              )}
            </label>

            {/* college name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">College name</span>
              </div>
              <input
                placeholder="e.g. sies"
                className="input input-bordered w-full"
                {...register("collegeName")}
              />
              {errors.collegeName && (
                <ErrorLabel message={errors.collegeName.message} />
              )}
            </label>

            {/* board name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Degree Type</span>
              </div>
              <select
                className="select select-bordered"
                {...register("boardName")}
              >
                <option value={"maharastra board"}>Maharashtra Board</option>
              </select>
              {errors.boardName && (
                <ErrorLabel message={errors.boardName.message} />
              )}
            </label>

            {/* Percentage */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Percentage</span>
              </div>
              <input
                placeholder="e.g. 69.69"
                className="input input-bordered w-full"
                {...register("percentage")}
              />
              {errors.percentage && (
                <ErrorLabel message={errors.percentage.message} />
              )}
            </label>
          </div>
        </section>
        {/* Academic Details end */}

        {/* Programme selection */}
        <section>
          <h2 className="text-2xl font-bold">Programme Selection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-5">
            {/* Programme selection */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Select Programme</span>
              </div>
              <select
                className="select select-bordered"
                {...register("progCode")}
              >
                {programmes && programmes?.map((p) => <option key={p._id} value={p.progCode}>{`${p.progCode} - ${p.progTitle}`}</option>)}
              </select>
              {errors.progCode && (
                <ErrorLabel message={errors.progCode.message} />
              )}
            </label>
          </div>
        </section>
        {/* Programme selection end */}

        <button className="btn btn-primary w-fit" type="submit">
          Create application
        </button>
      </form>
    </>
  );
}