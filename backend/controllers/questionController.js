const Question = require('../models/Questions'); // Import the Question model
const QuestionPack = require('../models/QuestionPack'); // Import the pack model

exports.getQuestions = async (req, res) => {
    try {
        const _id = req.query.id;

        if (!_id) {
            return res.status(400).json({ message: "QuestionPack ID is required" });
        }

        /*console.log("Fetching questions for pack ID:", _id);*/
        // Fetch QuestionPack by _id and populate the questions
        const questionPack = await QuestionPack.findById(_id).populate('questions');

        if (!questionPack) {
            return res.status(404).json({ message: "QuestionPack not found" });
        }

        if (!questionPack.questions || questionPack.questions.length === 0) {
            return res.status(404).json({ message: "No questions found in this pack" });
        }

        res.status(200).json({ 
            questions: questionPack.questions,
            packInfo: {
                topic: questionPack.topic,
                difficulty: questionPack.difficulty,
                totalQuestions: questionPack.questions.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getQuestionPack = async (req, res) => {
  try {
    let topic = req.query.topic;
    
    // Convert kebab-case to proper format if needed
    if (topic.includes('-')) {
      topic = topic.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }

    const questions = await QuestionPack.find({ topic });

    if (!questions.length) {
      console.log("No questions found for this topic");
      return res.status(404).json({ message: "No questions found for this topic" });
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("GetQuestionPack Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postQuestion = async (req, res) => {
  try {
    const { topic, question, options, ansIndex, explanation, difficulty } = req.body;

    let QExists = await Question.findOne({ question });
    if (QExists) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const newQuestion = new Question({ question, options, ansIndex, explanation });
    await newQuestion.save();

    // Find the latest pack
    //let latestPack = await QuestionPack.findOne().sort({ createdAt: -1 });
    let latestPack = await QuestionPack.findOne({ topic, difficulty }).sort({ createdAt: -1 });

    if(difficulty == "easy" || difficulty == "medium"){
      if (!latestPack || latestPack.questions.length >= 10) {

        let lastNumber = latestPack?.testName?.match(/#(\d+)$/)?.[1] || "0000";
        // Pad the number to 4 digits
        let nextNumber = String(parseInt(lastNumber) + 1).padStart(4, "0");
        let testName = `${topic}_${difficulty} #${nextNumber}`;

        latestPack = new QuestionPack({ testName, topic, difficulty, questions: [newQuestion._id] });
      } else {
        latestPack.questions.push(newQuestion._id);
      }
    }
    else if(difficulty == "hard"){
      if (!latestPack || latestPack.questions.length >= 15) {

        let lastNumber = latestPack?.testName?.match(/#(\d+)$/)?.[1] || "0000";
        // Pad the number to 4 digits
        let nextNumber = String(parseInt(lastNumber) + 1).padStart(4, "0");
        let testName = `${topic}_${difficulty} #${nextNumber}`;

        latestPack = new QuestionPack({ testName, topic, difficulty, questions: [newQuestion._id] });
      } else {
        latestPack.questions.push(newQuestion._id);
      }
    }
    else{
      return res.status(400).json({ message: "Invalid difficulty level" });
    }
    await latestPack.save();


    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.postBulkQuestions = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array of questions.' });
    }

    let inserted = 0;
    let skipped = 0;
    let failed = [];

    for (const question of questions) {
      try {
        // Create mock req and res objects
        const mockReq = { body: question };
        
        let wasInserted = false;
        const mockRes = {
          status(code) {
            this.statusCode = code;
            return this;
          },
          json(payload) {
            if (this.statusCode === 201) {
              inserted++;
              wasInserted = true;
            } else if (this.statusCode === 400) {
              skipped++;
              failed.push({ 
                question: question.question, 
                reason: payload.message || 'Question already exists or validation error' 
              });
            }
            return payload;
          }
        };

        // Call the existing postQuestion function
        await exports.postQuestion(mockReq, mockRes);
        
      } catch (error) {
        skipped++;
        failed.push({ 
          question: question.question, 
          reason: error.message || 'Unhandled error in postQuestion' 
        });
      }
    }

    return res.status(200).json({
      message: `Bulk insert finished. ${inserted} added, ${skipped} skipped.`,
      insertedCount: inserted,
      skippedCount: skipped,
      failedDetails: failed
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Bulk insert failed at server level.' });
  }
}
