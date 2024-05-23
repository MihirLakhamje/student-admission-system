import asyncHandler from "../libs/AsyncHandler.js";

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role!== "admin") {
    throw new Error("You are not authorized to perform this action");
  }
  next();
});