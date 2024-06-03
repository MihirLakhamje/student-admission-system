import { myApplication } from "@/api/applications";
import { upload } from "@/api/upload";
import { updateProgramme } from "@/api/programmes";
import { ErrorLabel } from "@/components/CustomLabels";
import { useAuth } from "@/context/AuthProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, Trash2, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const uploadSchema = yup.object({
  photo: yup.object(),
  signature: yup.object(),
  hscMarksheet: yup.object(),
})
export default function UploadDoc() {
  const { user, isAuthenticated, token } = useAuth();
  const [application, setApplication] = useState(null);
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm()
const navigate = useNavigate();
  async function handleDoc(input) {
    try {
      await upload(application,input, token)
      navigate("/application/view")
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    async function fetchProgramme() {
      try {
        const {data}  = await myApplication(user?._id, token);
        setApplication(()=> data?._id)
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchProgramme()
  }, [application])

  return (
    <>
      <div className="overflow-x-auto">
        <form  onSubmit={handleSubmit(handleDoc)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("photo")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Signature</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("signature")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">HSC marksheet</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              {...register("hscMarksheet")}
            />
          </div> 
          <div className="form-control mt-6">
            <button className="btn btn-primary w-fit" type="submit">
              Submit application
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
