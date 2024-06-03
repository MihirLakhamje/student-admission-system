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
    zipCode,
    phoneNumber,
    bloodGroup,
    gender,
    motherName,
    collegeName,
    boardName,
    percentage,
  } = req.body;


  if (
    !progCode ||
    !age ||
    !city ||
    !state ||
    !country ||
    !zipCode ||
    !phoneNumber ||
    !bloodGroup ||
    !gender ||
    !motherName ||
    !collegeName ||
    !boardName ||
    !percentage
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const isExists = await Application.findOne({
    student: req.user._id,
    applicationStatus: { $in: ["pending", "accepted"] },
  });
  if (isExists) {
    throw new ApiError(400, "Application already exists");
  }

  const programme = await Programme.findOne({ progCode });
  if (!programme) {
    throw new ApiError(404, "Programme does not exist");
  }

  const application = await Application.create({
    student: req.user._id,
    programme: programme._id,
    personalDetails: {
      age,
      phoneNumber,
      address: {
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
    }
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
        applicationData: [
          { $skip: (page - 1) * pageSize }, 
          { $limit: pageSize }, 
          {
            $lookup: {
              from: "programmes",
              localField: "programme",
              foreignField: "_id",
              as: "programme",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "student",
              foreignField: "_id",
              as: "student",
            },
          },
          {
            $project: {
              _id: 1,
              "programme.progTitle": 1,
              "student.firstName": 1,
              "student.lastName": 1,
              applicationStatus: 1,
              createdAt: 1,
            },
          },
          {
            $addFields: {
              student: {
                $arrayElemAt: ["$student", 0],
              },
              programme: {
                $arrayElemAt: ["$programme", 0],
              },
            },
          },
        ],
      }
    },
  ]);
  return res.json(new ApiResponse(200, "Applications fetched", { metaData: applications[0].metaData[0], applications: applications[0].applicationData }));
});

export const getApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.applicationId).populate("student").populate("programme");
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


export const myApplication = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const application = await Application.findOne({ student: userId}).populate("programme").populate("student");
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  return res.json(new ApiResponse(200, "Application fetched", application));
})

