import TypingText from "../models/typingtext.model.js";

const getAllTexts = async (req, res) => {
  const texts = await TypingText.find({});
  res.status(200).json({ texts });
};

const getText = async (req, res) => {
  const text = await TypingText.findOne(req.params);
  if (!text) {
    throw new Error("Text not found");
  }
  res.json({ text });
  // const texts = await Text.findOne({difficulty: difficulty});
};

export { getAllTexts, getText };
