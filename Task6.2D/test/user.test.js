/**
 * SIT725 – Task 6.2D
 * Testing Practical Integration
 *
 * Test suite designed as per workshop guidance on testing strategy.
 * Mocha (runner), Chai (assertions), and chai-http (HTTP testing)
 * are used to automate functional testing of user creation logic.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API Tests', () => {

  // Connect to test DB before all tests
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/sit725_test');
    await User.deleteMany({});
  });

  // Disconnect after all tests
  after(async () => {
    await mongoose.connection.close();
  });

  // Positive test: new user creation
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/submit')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: '123456'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('User successfully created!');
        done();
      });
  });

  // Negative test: duplicate email check
  it('should not allow duplicate emails', (done) => {
    chai.request(app)
      .post('/submit')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: '123456'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal('Email already exists.');
        done();
      });
  });
});

