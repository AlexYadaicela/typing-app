import express from "express";
import { getAllTexts, getText } from "../controllers/texts.js";

const router = express.Router();

router.route("/").get(getAllTexts);
router.route("/:difficulty").get(getText);

export default router;
