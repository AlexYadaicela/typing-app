import typingText from "../models/typingtext.model.js";
import StatusCodes from "http-status-codes";

const getAllTexts = async (req, res) => {
  try {
    console.log(req.user.userId);

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
  const text = await typingText.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!text) {
    return res.status(500).json({
      message: "No text found",
    });
  }
  res.status(StatusCodes.OK).json({ result: text });
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
  const text = await typingText.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!text) {
    return res.status(404).json({ message: "Text not found" });
  }

  res.status(200).json({ message: "Text deleted successfully" });
};

export { getAllTexts, getTextById, createText, updateText, deleteText };
