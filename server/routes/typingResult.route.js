import express from "express";

import {
  saveResult,
  getUserResults,
  getResultById,
} from "../controllers/typingResult.controller.js";

const router = express.Router();

router.route("/").post(saveResult);
router.route("/user").get(getUserResults);
router.route("/:id").get(getResultById);

export default router;
