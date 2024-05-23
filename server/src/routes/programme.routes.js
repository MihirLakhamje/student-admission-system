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

router.route("/").post(authVerify, isAdmin, addProgramme);
router.route("/").get(getAllProgrammes);

router.route("/:programmeId").patch(authVerify, isAdmin, updateProgramme);
router.route("/:programmeId").delete(authVerify, isAdmin, deleteProgramme);
router.route("/:programmeId").get(getProgrammeById);
router.route("/:programmeId/:courseId").get(authVerify, isAdmin, addCourse);
export default router;
