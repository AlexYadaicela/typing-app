import mongoose from "mongoose";

const typingTextSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please provide the text"],
      trim: true,
      minlength: 10,
      maxlength: 1000,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

typingTextSchema.pre("save", function (next) {
  this.wordCount = this.content.trim().split(/\s+/).length;
  next();
});

export default mongoose.model("TypingText", typingTextSchema);
