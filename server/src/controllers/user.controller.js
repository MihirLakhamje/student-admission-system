import User from "../models/user.model.js";
import { ApiError } from "../libs/ApiError.js";
import { ApiResponse } from "../libs/ApiResponse.js";
import asyncHandler from "../libs/AsyncHandler.js";
import bcrptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const isExists = await User.findOne({ email });
  if (isExists) {
    throw new ApiError(400, "Email already exists");
  }

  const hashPassword = await bcrptjs.hash(password, 10);
  if (!hashPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    role: "user",
  });

  await user.save();
  return res.json(new ApiResponse(200, "user created", user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  const isMatch = await bcrptjs.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  const userData = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };

  const authToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return res
    .cookie("accessToken", authToken, { httpOnly: true, secure: true })
    .json(new ApiResponse(200, "user logged in", { authToken, userData }));
});

export const logout = asyncHandler(async (req, res) => {
  return res
    .clearCookie("accessToken")
    .json(new ApiResponse(200, "user logged out"));
});

export const getSession = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.json(new ApiResponse(200, "user decoded", user));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  let { page, pageSize } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  const users = await User.aggregate([
    {
      $facet: {
        metaData: [
          { $count: "totalCount" },
          { $addFields: { page: page, pageSize: pageSize } },
        ],
        userData: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      },
    }
  ]);
  return res.json(new ApiResponse(200, "users fetched", users));
});
