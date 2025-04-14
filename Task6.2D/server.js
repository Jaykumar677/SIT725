const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware setup for parsing data and enabling CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routing to render frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Importing controller logic (can be expanded)
const User = require('./models/user');

// Main route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Basic validation
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send('All fields are required.');
    }

    // Prevent duplicate email registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists.');
    }

    // Create and save user
    const newUser = new User({ first_name, last_name, email, password });
    await newUser.save();

    res.send('User successfully created!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving user');
  }
});

// Connect to MongoDB only if not testing
if (require.main === module) {
  const mongoose = require('mongoose');
  const mongoURI = 'mongodb://localhost:27017/sit725_db';
  mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB successfully!');
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
}

// Export app for testing
module.exports = app;
