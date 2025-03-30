const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


const mongoURI = 'mongodb://localhost:27017/sit725_db'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully!');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


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

const User = mongoose.model('User', userSchema);

module.exports = User;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname));


app.post('/submit', async (req, res) => {
    try {
      console.log('Received data:', req.body); 
  
      const { first_name, last_name, email, password } = req.body;
  
      
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).send('All fields are required.');
      }
  
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email already exists.');
      }
  
      
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
  


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
