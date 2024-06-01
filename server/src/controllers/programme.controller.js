import Programme from "../models/programme.model.js";
import asyncHandler from "../libs/AsyncHandler.js";
import { ApiError } from "../libs/ApiError.js";
import { ApiResponse } from "../libs/ApiResponse.js";

export const addProgramme = asyncHandler(async (req, res) => {
  const {
    progTitle,
    progCode,
    duration,
    description,
    degreeType,
    overallFees,
  } = req.body;
  if (
    !progTitle ||
    !progCode ||
    !duration ||
    !degreeType ||
    !overallFees
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const isExists = await Programme.findOne({ progCode });
  if (isExists) {
    throw new ApiError(400, "Programme already exists");
  }

  const programme = await Programme.create({
    progTitle,
    progCode,
    duration,
    description,
    degreeType,
    overallFees,
  });

  return res.json(new ApiResponse(201, "Programme created", programme));
});

export const getAllProgrammes = asyncHandler(async (req, res) => {
  let { page, pageSize } = req.query;

  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 8;
  const programmes = await Programme.aggregate([
    {
      $facet: {
        metaData: [
          { $count: "totalCount" },
          { $addFields: { page: page, pageSize: pageSize } }
          
        ],
        programmeData: [
          { $skip: (page - 1) * pageSize }, 
          { $limit: pageSize },
        ],
      },
    },
  ]);

  return res.json(new ApiResponse(200, "Programmes fetched", {metaData: programmes[0].metaData[0], programmes: programmes[0].programmeData}));
});

export const updateProgramme = asyncHandler(async (req, res) => {
  const { data } = req.body;
  const { programmeId } = req.params;

  const programme = await Programme.findById(programmeId);
  if (!programme) {
    throw new ApiError(404, "Programme not found");
  }

  const updated = await Programme.findByIdAndUpdate(programmeId, data);
  await updated.save();

  const updatedProgramme = await Programme.findById(programmeId);

  return res.json(new ApiResponse(200, "Programme updated", updatedProgramme));
});

export const deleteProgramme = asyncHandler(async (req, res) => {
  const { programmeId } = req.params;
  await Programme.findByIdAndDelete(programmeId);

  return res.json(new ApiResponse(200, "Programme deleted"));
});

export const getProgrammeById = asyncHandler(async (req, res) => {
  const { programmeId } = req.params;
  const programme = await Programme.findById(programmeId);
  if (!programme) {
    throw new ApiError(404, "Programme not found");
  }
  return res.json(new ApiResponse(200, "Programme fetched", programme));
});

export const addCourse = asyncHandler(async (req, res) => {
  const { programmeId } = req.params;
  const { courseId } = req.body;

  const programme = await Programme.findById(programmeId);
  if (!programme) {
    throw new ApiError(404, "Programme not found");
  }
  const isExists = programme.courses.includes(courseId);
  if (isExists) {
    throw new ApiError(400, "Course already exists");
  }
  programme.courses.push(courseId);
  await programme.save();
  return res.json(new ApiResponse(201, "Course added", programme));
});
