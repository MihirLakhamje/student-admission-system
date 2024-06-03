import { Router } from "express";
import { upload } from "../middlewares/mutler.js";
import { authVerify } from "../middlewares/authVerify.js";
import { uploadDoc } from "../controllers/upload.controller.js";
const router = Router();

router.route("/:applicationId").post(
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
  uploadDoc);

export default router;
