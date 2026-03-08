import Text from "../models/text.js";

const getAllTexts = async (req, res) => {
  const texts = await Text.find({});
  res.status(200).json({ texts });
};

const getText = async (req, res) => {
  const text = await Text.findOne(req.params);
  if (!text) {
    throw new Error("Text not found");
  }
  res.json({ text });
  // const texts = await Text.findOne({difficulty: difficulty});
};

export { getAllTexts, getText };
