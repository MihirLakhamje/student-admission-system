import { Router } from "express";
import { acceptanceStatus, createApplication, getAllApplications, updateApplication } from "../controllers/application.controller.js";
import { upload } from "../middlewares/mutler.js";
import { authVerify } from "../middlewares/authVerify.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.route("/").post(
  authVerify,
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
    {
      name: "signature",
      maxCount: 1,
    },
    {
      name: "hscMarksheet",
      maxCount: 1,
    }
  ]),
  createApplication);
router.route("/").get(authVerify, isAdmin, getAllApplications);
router.route("/:applicationId").patch(authVerify, updateApplication);
router.route("/:applicationId").get(authVerify, isAdmin, getAllApplications);
router.route("/:applicationId").post(authVerify, isAdmin, acceptanceStatus);

export default router;
