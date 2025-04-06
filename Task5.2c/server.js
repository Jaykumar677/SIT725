const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // Required to serve static files

const app = express();
const port = 3000;

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/sit725_db';

// Connect to MongoDB with updated options
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define the User Schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User Model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());  // Allow cross-origin requests if needed

// Serve static files (e.g., CSS, JS, images) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file from the views directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html')); // Adjust path to index.html
});

// Handle the form submission
app.post('/submit', async (req, res) => {
  try {
    console.log('Received data:', req.body);

    const { first_name, last_name, email, password } = req.body;

    // Validate input fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send('All fields are required.');
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists.');
    }

    // Create a new user and save it to the database
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });

    await newUser.save();
    res.send('User successfully created!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving user');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
