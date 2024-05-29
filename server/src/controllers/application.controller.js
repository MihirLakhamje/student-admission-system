import Application from "../models/application.model.js";
import asyncHandler from "../libs/AsyncHandler.js";
import { ApiError } from "../libs/ApiError.js";
import { ApiResponse } from "../libs/ApiResponse.js";
import Programme from "../models/programme.model.js";
import { uploadOnCloudinary } from "../libs/cloudinary.js";
import fs from "fs";

export const createApplication = asyncHandler(async (req, res) => {
  const {
    progCode,
    age,
    city,
    state,
    country,
    aptStreet,
    zipCode,
    phoneNumber,
    bloodGroup,
    gender,
    motherName,
    collegeName,
    boardName,
    percentage,
  } = req.body;
  const photoLocalPath = req.files?.photo[0]?.path;
  const signatureLocalPath = req.files?.signature[0]?.path;
  const hscMarksheetLocalPath = req.files?.hscMarksheet[0]?.path;

  function deleteLocalFiles() {
    fs.unlinkSync(photoLocalPath);
    fs.unlinkSync(signatureLocalPath);
    fs.unlinkSync(hscMarksheetLocalPath);
  }

  if (
    !progCode ||
    !age ||
    !city ||
    !state ||
    !country ||
    !aptStreet ||
    !zipCode ||
    !phoneNumber ||
    !bloodGroup ||
    !gender ||
    !motherName ||
    !collegeName ||
    !boardName ||
    !percentage
  ) {
    deleteLocalFiles();
    throw new ApiError(400, "Please provide all the required fields");
  }

  const isExists = await Application.findOne({
    student: req.user._id,
    applicationStatus: { $in: ["pending", "accepted"] },
  });
  if (isExists) {
    deleteLocalFiles();
    throw new ApiError(400, "Application already exists");
  }

  const programme = await Programme.findOne({ progCode });
  if (!programme) {
    deleteLocalFiles();
    throw new ApiError(404, "Programme does not exist");
  }

  if (!photoLocalPath) {
    deleteLocalFiles();
    throw new ApiError(400, "Please upload photo");
  }
  if (!signatureLocalPath) {
    deleteLocalFiles();
    throw new ApiError(400, "Please upload signature");
  }
  if (!hscMarksheetLocalPath) {
    deleteLocalFiles();
    throw new ApiError(400, "Please upload hsc marksheet");
  }

  const photo = await uploadOnCloudinary(photoLocalPath);
  const signature = await uploadOnCloudinary(signatureLocalPath);
  const hscMarksheet = await uploadOnCloudinary(hscMarksheetLocalPath);

  const application = await Application.create({
    student: req.user._id,
    programme: programme._id,
    personalDetails: {
      age,
      phoneNumber,
      address: {
        aptStreet,
        city,
        state,
        zipCode,
        country,
      },
      bloodGroup,
      gender,
    },
    academicDetails: {
      motherName,
      collegeName,
      boardName,
      percentage,
    },
    documents: {
      photo: photo.public_id,
      signature: signature.public_id,
      hscMarksheet: hscMarksheet.public_id,
    },
  });

  await application.save();

  res.json(new ApiResponse(201, "Application created"));
});

export const getAllApplications = asyncHandler(async (req, res) => {
  let { page, pageSize } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  const applications = await Application.aggregate([
    {
      $facet:{
        metaData: [
          { $count: "totalCount" },
          { $addFields: { page: page, pageSize: pageSize } },
        ],
        applicationData: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      }
    }
  ]);
  return res.json(new ApiResponse(200, "Applications fetched", applications));
});

export const getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.applicationId);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  return res.json(new ApiResponse(200, "Application fetched", application));
});

export const updateApplication = asyncHandler(async (req, res) => {
  const { updateFields } = req.body;
  const { applicationId } = req.params;
  const application = await Application.findById(applicationId);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  if (application.applicationStatus === "accepted") {
    throw new ApiError(400, "Application already accepted");
  }
  if (application.applicationStatus !== "underReview") {
    throw new ApiError(
      400,
      "You can only update application in underReview status"
    );
  }
  const updated = await Application.findByIdAndUpdate(
    applicationId,
    updateFields
  );
  await updated.save();

  const updatedApplication = await Application.findById(applicationId);
  return res.json(
    new ApiResponse(200, "Application updated", updatedApplication)
  );
});

export const acceptanceStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  const { applicationId } = req.params;
  const application = await Application.findById(applicationId);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  application.applicationStatus = status;
  application.note = note || "";
  await application.save();
  return res.json(
    new ApiResponse(200, "Application status updated", application)
  );
});
