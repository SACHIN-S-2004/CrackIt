const express = require('express'); // Import the Express framework
const cors = require('cors'); // Middleware to enable CORS
const dotenv = require('dotenv'); // Load environment variables from .env file
const connectDB = require('./config/db'); // Import the database connection
const userRoutes = require('./routes/userRoutes'); // Import the API routes
const questionRoutes = require('./routes/aptTestRoutes'); // Import the question routes
const resultRoutes = require('./routes/testResultRoutes'); // Import the question routes

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

//Routes
app.use('/user', userRoutes); // Use the API routes under the /api path
app.use('/question', questionRoutes); // Use the question routes under the /question path
app.use('/result', resultRoutes); // Use the result routes under the /result path

connectDB(); // Connect to the database

app.listen(PORT, () => {
  console.log('Server is running : http://localhost:3000 ✅✅');
  //console.log('✅ MongoDB connected');
});

/*app.get('/', (req, res) => {
  res.status(200).json({message: "Hello, World! This is the backend server."});
    //res.send('Hello, World! This is the backend server.');
});*/

app.get("/", (req, res) => res.status(200).send("server is running!"));