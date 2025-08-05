const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import the authentication middleware
const router = express.Router();    // Create a new router instance

const { registerUser, LoginUser, userList , updateUserProfile , changePassword, deleteUser} = require('../controllers/userController');
// Define the routes and associate them with controller functions

router.post('/register', registerUser); // Route for user registration
router.post('/login', LoginUser); // Route for user login
router.get('/users',userList); // Route to get the list of users
//router.put('/updateProfile',updateUserProfile); // Route to update user details
router.post('/updateProfile',updateUserProfile); // Route to update user details
router.post('/changePassword',changePassword); // Route to update user details
router.delete('/delete', protect , deleteUser); // Route to delete a user

module.exports = router; // Export the router to be used in the main app file