import typingtextModel from "../models/typingtext.model.js";

const getAllTexts = async (req, res) => {
  res.status(200).json(req);
};
const getTextById = async (req, res) => {
  res.status(200).json({ message: "working 1" });
};

const createText = async (req, res) => {
  res.status(200).json({ message: "working 2" });
};
const updateText = async (req, res) => {
  res.status(200).json({ message: "working 3" });
};
const deleteText = async (req, res) => {
  res.status(200).json({ message: "working 4" });
};

export { getAllTexts, getTextById, createText, updateText, deleteText };
