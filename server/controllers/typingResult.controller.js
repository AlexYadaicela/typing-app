import TypingResult from "../models/typingResult.model.js";
import User from "../models/user.model.js";

const saveResult = async (req, res) => {
  const { textId, wpm, accuracy, errorCount, duration, completed } = req.body;
  if (!textId || !wpm || !accuracy || !duration) {
    return res.status(400).json({
      success: false,
      message: "Please provide textId, wpm, accuracy and duration",
    });
  }

  const result = await TypingResult.create({
    userId: req.user.userId,
    textId,
    wpm,
    accuracy,
    errorCount,
    duration,
    completed,
  });

  await updateUserStats(req.user.userId);

  res.status(201).json({ message: "working save result", result });
};

const getUserResults = async (req, res) => {
  const results = await TypingResult.find({ userId: req.user.userId })
    .populate("textId", "content difficulty wordCount")
    .sort({ createdAt: -1 });
  if (!results.length) {
    return res.status(404).json({
      message: "No results found",
    });
  }

  res.status(200).json({ count: results.length, results });
};

const getResultById = async (req, res) => {
  const result = await TypingResult.findOne({
    _id: req.params.id,
    userId: req.user.userId,
  }).populate("textId", "content difficulty wordCount");

  if (!result) {
    return res.status(404).json({
      message: "Result not found",
    });
  }
  res.status(200).json({ result });
};

const updateUserStats = async (userId) => {
  const results = await TypingResult.find({
    userId,
    completed: true,
  });

  if (!results.length) return;

  const totalTests = results.length;
  const averageWpm = Math.round(
    results.reduce((sum, r) => sum + r.wpm, 0) / totalTests,
  );
  const averageAccuracy = Math.round(
    results.reduce((sum, r) => sum + r.accuracy, 0) / totalTests,
  );
  const bestWpm = Math.max(...results.map((r) => r.wpm));

  await User.findByIdAndUpdate(userId, {
    "stats.totalTests": totalTests,
    "stats.averageWpm": averageWpm,
    "stats.averageAccuracy": averageAccuracy,
    "stats.bestWpm": bestWpm,
  });
};
export { saveResult, getUserResults, getResultById };
