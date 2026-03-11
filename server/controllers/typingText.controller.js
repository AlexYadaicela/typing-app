import TypingText from "../models/typingText.model.js";
import StatusCodes from "http-status-codes";

const getAllTexts = async (req, res) => {
  try {
    console.log(req.user.userId);

    const texts = await TypingText.find({
      isActive: true,
      createdBy: req.user.userId,
    }).sort("createdAt");

    res.status(StatusCodes.OK).json({ texts, count: texts.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getTextById = async (req, res) => {
  const text = await TypingText.findOne({
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
  const { content, difficulty } = req.body;
  const text = await TypingText.create({
    content,
    difficulty,
    createdBy: req.user.userId,
  });
  res.status(201).json(text);
};

const updateText = async (req, res) => {
  const { content, difficulty, isActive } = req.body;

  if (!content && !difficulty && !isActive === undefined) {
    return res
      .status(400)
      .json({ message: "Please provide at least one field to update" });
  }

  const text = await TypingText.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!text) {
    return res.status(404).json({
      message: "Text not found",
    });
  }

  res.status(200).json({ message: "Text updated successfully" });
};

const deleteText = async (req, res) => {
  const text = await TypingText.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });

  if (!text) {
    return res.status(404).json({ message: "Text not found" });
  }

  res.status(200).json({ message: "Text deleted successfully" });
};

export { getAllTexts, getTextById, createText, updateText, deleteText };
