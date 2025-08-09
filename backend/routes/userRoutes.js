const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import the authentication middleware
const router = express.Router();    // Create a new router instance

const { registerUser, LoginUser, userList , updateUserProfile , changePassword/*, deleteUser*/} = require('../controllers/userController');
// Define the routes and associate them with controller functions

router.post('/register', registerUser); // Route for user registration
router.post('/login', LoginUser); // Route for user login
router.post('/updateProfile', protect, updateUserProfile); // Route to update user details
router.post('/changePassword', protect, changePassword); // Route to update user details
router.get('/users', protect, userList); // Route to get the list of users
//router.delete('/delete', protect , deleteUser); // Route to delete a user
//router.put('/updateProfile',updateUserProfile); // Route to update user details

module.exports = router; // Export the router to be used in the main app file