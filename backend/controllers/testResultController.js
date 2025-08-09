const TestResult = require('../models/TestResult'); 
const User = require('../models/User'); // Assuming you have a User model

exports.postResult = async (req, res) => {
  try {
    /*if(!testResult){
        return res.status(400).json({message: "User doesn't exist"});  
    }*/

    /*const newResult = new TestResult({ email, qPackID, selectedOptions, correctOptions, score });
    await newResult.save();

    res.status(201).json({ message: "Test result saved successfully", result: newResult });

    const newQuestion = new Question({ question, options, ansIndex, explanation });
    await newQuestion.save();*/

    // Find the latest pack
    //let latestPack = await QuestionPack.findOne().sort({ createdAt: -1 });
    //let resultPack = await TestResult.findOne({ email }).sort({ createdAt: -1 });


    const { email, topic, testName, qPackID, selectedOptions, correctOptions, score, total } = req.body;

    let testResult = await TestResult.findOne({email, qPackID});

    if (!testResult ) {
      testResult = new TestResult({ email, topic, testName, qPackID, selectedOptions, correctOptions, score, total });
    } else {
      testResult.qPackID.push(qPackID);
      testResult.selectedOptions.push(selectedOptions);
      testResult.correctOptions.push(correctOptions);
      testResult.score.push(score);
      testResult.total.push(total);
    }
    await testResult.save();


    res.status(201).json({ message: "Result added successfully", result: testResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.getResult = async (req, res) => {
  try {
    const { email } = req.params;

    const testResult = await TestResult.find({ email });

    const response = testResult.map(result => ({
      id: result.qPackID,
      topic: result.topic,
      testName: result.testName,
      score: result.score,
      total: result.total,
      date: result.createdAt
    }));

    res.status(200).json({ message: "Results fetched successfully", results: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

