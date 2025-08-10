const mongoose = require("mongoose");

const QuestionPackSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"] },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuestionPack", QuestionPackSchema, "questionpacks");