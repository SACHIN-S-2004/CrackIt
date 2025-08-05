const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
    email: { type: String, required: true },
    topic: { type: String, required: true },
    testName: { type: String, required: true },
    qPackID: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionPack" },
    selectedOptions: { type: [String], required: true },
    correctOptions: { type: [String], required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TestResult",ResultSchema, "results");