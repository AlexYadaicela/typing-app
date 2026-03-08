import mongoose from "mongoose";

const typingResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    textId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypingText",
      required: true,
    },
    wpm: {
      type: Number,
      required: true,
      min: 0,
    },
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    errors: {
      type: Number,
      default: 0,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("TypingResult", typingResultSchema);
