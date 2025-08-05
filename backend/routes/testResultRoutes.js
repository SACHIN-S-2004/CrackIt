const express = require('express');
//const { protect } = require('../middleware/authMiddleware'); // Import the authentication middleware
const router = express.Router();// Create a new router instance

const { postResult, getResult } = require('../controllers/testResultController');
// Define the routes and associate them with controller functions

router.post('/store', postResult);
router.get('/user/:email', getResult);

module.exports = router; 