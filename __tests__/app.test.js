require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/modles/User.js'); 

let agent; 
// eslint-disable-next-line no-unused-vars
let user; 

describe('app routes', () => {
  
  beforeAll(async() => {
    connect();

    agent = request.agent(app);

    user =  await User
      .create({
        email: 'cool@cool.com',
        password: 'password1'
      });
  });

  beforeEach(async() => {
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'cool@cool.com',
        password: 'password1'
      });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should post a new user properly', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'cool@cool.cool', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session=')); 
        expect(res.body).toEqual({
          _id: expect.any(String), 
          email: 'cool@cool.cool', 
          __v: 0
        }); 
      }); 
  }); 

  it('can login a user when their creditials are correct', async() => {
    await User.create({
      email: 'cool@cool.cool', 
      password: 'coolidge'
    }); 
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'cool@cool.cool', 
        password: 'coolidge'
      })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session=')); 
        expect(res.body).toEqual({
          _id: expect.any(String), 
          email: 'cool@cool.cool', 
          __v: 0
        }); 
      }); 
  }); 

  it('errors when logging in with the wrong email', async() => {
    await User.create({
      email: 'cool@cool.cool', 
      password: 'coolidge'
    }); 
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nay@nay.nay', password: 'coolidge' })
      .then(res => {
        expect(res.status).toEqual(401); 
        expect(res.body).toEqual({
          status: 401, 
          message: 'This email is invalid. Or maybe password. You will never know.'
        }); 
      }); 
  }); 

  it('cannot login with incorrect password', async() => {
    await User.create({
      email: 'cool@cool.cool', 
      password: 'coolidge'
    }); 
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'cool@cool.cool', password: 'jackson' })
      .then(res => {
        expect(res.status).toEqual(401); 
        expect(res.body).toEqual({
          status: 401, 
          message: 'That email or password is not correct. Sort it out.'
        }); 
      }); 
  }); 

  it('can user a verification path to determine a logged in user', async() => {
    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect (res.body).toEqual({
          _id: expect.any(String),
          email: 'cool@cool.com',
          __v: 0
        });
      });
  });
}); 
