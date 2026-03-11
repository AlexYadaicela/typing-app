import mongoose from "mongoose";

const typingTextSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please provide the text"],
      trim: true,
      minlength: [10, "Content must be at least 10 characters"],
      maxlength: [1000, "Content must not exceed 1000 characters"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    wordCount: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  },
);

typingTextSchema.pre("save", function () {
  this.wordCount = this.content.trim().split(/\s+/).length;
});

export default mongoose.model("TypingText", typingTextSchema);
