// controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send('All fields are required.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists.');
    }

    const newUser = new User({ first_name, last_name, email, password });
    await newUser.save();
    res.send('User successfully created!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving user');
  }
};
