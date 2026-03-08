import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: [true, "Provide the difficulty of the text"],
  },
  text: {
    type: String,
    required: [true, "Provide the text"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Text", textSchema);
