const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    ansIndex: { type: Number, required: true }, // e.g., 1 means options[1]
    explanation: { type: String }
});

module.exports = mongoose.model("Questions",QuestionSchema, "questions");