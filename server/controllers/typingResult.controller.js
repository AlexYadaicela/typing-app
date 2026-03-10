import typingResult from "../models/typingResult.model.js";

const saveResult = async (req, res) => {
  res.status(200).json({ message: "working save result" });
};

const getUserResults = async (req, res) => {
  res.status(200).json({ message: "working user result" });
};

const getResultById = async (req, res) => {
  res.status(200).json({ message: "working result by id" });
};
export { saveResult, getUserResults, getResultById };
