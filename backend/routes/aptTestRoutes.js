const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import the authentication middleware
const router = express.Router();// Create a new router instance

const { postQuestion, getQuestions, postBulkQuestions, getQuestionPack} = require('../controllers/questionController');
// Define the routes and associate them with controller functions

router.post('/add', postQuestion);
router.get('/get', getQuestions);
router.post('/bulk-add', postBulkQuestions);
router.get('/getList',getQuestionPack);

module.exports = router; 