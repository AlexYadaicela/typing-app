import express from "express";
import {
  getAllTexts,
  getTextById,
  createText,
  updateText,
  deleteText,
} from "../controllers/typingText.controller.js";

const router = express.Router();

router.route("/").post(createText).get(getAllTexts);
router.route("/:id").get(getTextById).delete(deleteText).patch(updateText);

export default router;
