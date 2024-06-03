import { Router } from "express";
import {
  acceptanceStatus,
  createApplication,
  getAllApplications,
  getApplication,
  myApplication,
  updateApplication,
} from "../controllers/application.controller.js";
import { authVerify } from "../middlewares/authVerify.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.route("/admin/").get(authVerify, isAdmin, getAllApplications);
router.route("/admin/:applicationId").get(authVerify, isAdmin, getApplication);
router
  .route("/admin/:applicationId")
  .post(authVerify, isAdmin, acceptanceStatus);

router.route("/").post(authVerify, createApplication);
router.route("/:userId").get(authVerify, myApplication);
router.route("/:applicationId").patch(authVerify, updateApplication);

export default router;
