import { ApiError } from "../libs/ApiError.js";
import { ApiResponse } from "../libs/ApiResponse.js";
import asyncHandler from "../libs/AsyncHandler.js";
import { uploadOnCloudinary } from "../libs/cloudinary.js";
import Application from "../models/application.model.js";
import Upload from "../models/upload.model.js";

export const uploadDoc = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const application = await Application.findById(applicationId);
  
  if(!application) {
    throw new ApiError(404, "Application not found");
  }
  const isExists = await Upload.findOne({
    application: applicationId
  })

  if(isExists) {
    throw new ApiError(400, "already uploaded");
  }

  const photoLocalPath = req.files.photo[0].path;
  const signatureLocalPath = req.files.signature[0].path;
  const hscMarksheetLocalPath = req.files.hscMarksheet[0].path;

  if(!photoLocalPath || !signatureLocalPath || !hscMarksheetLocalPath) {
    throw new ApiError(400, "Please provide all the required fields"); 
  }

  const photoUrl = await uploadOnCloudinary(photoLocalPath);
  const signatureUrl = await uploadOnCloudinary(signatureLocalPath);
  const hscMarksheetUrl = await uploadOnCloudinary(hscMarksheetLocalPath);

  const upload = await Upload.create({
    application: application._id,
    photo: photoUrl.public_id,
    signature: signatureUrl.public_id,
    hscMarksheet: hscMarksheetUrl.public_id
  })

  if(!upload) {
    throw new ApiError(500, "Something went wrong");
  }
  

  
  await upload.save();

  res.json(new ApiResponse(200, "success", {photoUrl, signatureUrl, hscMarksheetUrl}));
})