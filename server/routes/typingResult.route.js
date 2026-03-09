import express from "express";

import {
  saveResult,
  getUserResults,
  getResultById,
} from "../controllers/typingResult.controller.js";

const router = express.Router();

router.post("/", saveResult);
router.get("/user", getUserResults);
router.get("/:id", getResultById);

export default router;
