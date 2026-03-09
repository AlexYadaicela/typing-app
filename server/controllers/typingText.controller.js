import typingText from "../models/typingtext.model.js";
import StatusCodes from "http-status-codes";

const getAllTexts = async (req, res) => {
  try {
    const texts = await typingText
      .find({
        isActive: true,
        createdBy: req.user.userId,
      })
      .sort("createdAt");

    res.status(StatusCodes.OK).json({ texts, count: texts.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getTextById = async (req, res) => {
  res.status(200).json({ message: "working 1" });
};

const createText = async (req, res) => {
  try {
    const { content, difficulty } = req.body;
    const text = await typingText.create({
      content,
      difficulty,
      createdBy: req.user.userId,
    });
    res.status(201).json(text);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const updateText = async (req, res) => {
  res.status(200).json({ message: "working 3" });
};
const deleteText = async (req, res) => {
  res.status(200).json({ message: "working 4" });
};

export { getAllTexts, getTextById, createText, updateText, deleteText };
