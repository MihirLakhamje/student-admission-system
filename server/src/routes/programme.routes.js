import { Router } from "express";
import {
  addCourse,
  addProgramme,
  deleteProgramme,
  getAllProgrammes,
  getProgrammeById,
  updateProgramme,
} from "../controllers/programme.controller.js";
import { authVerify } from "../middlewares/authVerify.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.route("/admin").post(authVerify, isAdmin, addProgramme);
router.route("/admin/:programmeId").patch(authVerify, isAdmin, updateProgramme);
router.route("/admin/:programmeId").delete(authVerify, isAdmin, deleteProgramme);
router.route("/admin/:programmeId/:courseId").get(authVerify, isAdmin, addCourse);

router.route("/").get(getAllProgrammes);

router.route("/:programmeId").get(getProgrammeById);
export default router;
