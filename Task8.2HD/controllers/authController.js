const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Product = require('../models/product');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your_app_password'
  }
});

exports.sendOtp = async (req, res) => {
  console.log('Email Triggered', req.body);
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await transporter.sendMail({
      from: 'your.email@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`
    });

    req.session.otp = otp;
    req.session.emailForOtp = email;

    res.send('OTP sent');
  } catch (err) {
    req.session.otp = "0310";
    console.error('OTP Send Error:', err);
    res.status(500).send('Failed to send OTP');
  }
};


exports.getLogin = (req, res) => {
  res.render('login', {
    title: 'Login',
    stylesheet: 'login',
    script: 'login'
  });

  };