require('dotenv').config(); 
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const Dives = require('../lib/modles/Dives');

describe('Dive model routes', () => {
  beforeAll(() => {
    connect(); 
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase(); 
  });

  // eslint-disable-next-line no-unused-vars
  let dive; 

  beforeEach(async() => {
    dive = await Dives
      .create({
        location: 'Octopus Hole, Hoodsport, WA, USA',
        date: new Date(), 
        time: '1:00pm',
        duration: '2 hours',
        maxDepth: '45 minutes',
        diveBuddy: 'Gary',
        notes: 'Saw a million octopuses!'
      });
  }); 
  
  afterAll(() => {
    return mongoose.connection.close(); 
  });

  it('logges a new dive', () => {
    return request(app)
      .post('/api/v1/dives')
      .send({
        location: 'Octopus Hole, Hoodsport, WA, USA',
        date: new Date(), 
        time: '1:00pm',
        duration: '2 hours',
        maxDepth: '45 minutes',
        diveBuddy: 'Leif',
        notes: 'Saw a million octopuses!'
      })
      .then(res => {          
        expect(res.body).toEqual({
          _id: expect.any(String), 
          location: 'Octopus Hole, Hoodsport, WA, USA',
          date: expect.any(String), 
          time: '1:00pm',
          duration: '2 hours',
          maxDepth: '45 minutes',
          diveBuddy: 'Leif',
          notes: 'Saw a million octopuses!',
          __v: 0
        });
      });
  });
});
