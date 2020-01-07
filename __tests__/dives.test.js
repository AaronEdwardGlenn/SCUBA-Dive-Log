require('dotenv').config(); 
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const Dives = require('../lib/modles/Dives');
const User = require('../lib/modles/User');

let agent;
let user;

describe('Dive model routes', () => {
  beforeAll(async() => {
    connect(); 

    agent = request.agent(app);

    user = await User 
      .create({
        email: 'cool@cool.com',
        password: 'password1'
      });

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

  it('logges a new dive', async() => {
    return agent
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
  
  it('returns all logged dives', async() => {
    let dives = await Dives.create([
      {
        location: 'Sunrise, Hoodsport, WA, USA',
        date: new Date(), 
        time: '1:00pm',
        duration: '2 hours',
        maxDepth: '45 minutes',
        diveBuddy: 'Leif',
        notes: 'Saw a million seals!'
      },
      {
        location: 'Octopus Hole, Hoodsport, WA, USA',
        date: new Date(), 
        time: '1:00pm',
        duration: '2 hours',
        maxDepth: '45 minutes',
        diveBuddy: 'Leif',
        notes: 'Saw a million octopuses!'
      },
      {
        location: 'Yellow House Dock, Hoodsport, WA, USA',
        date: new Date(), 
        time: '1:00pm',
        duration: '2 hours',
        maxDepth: '45 minutes',
        diveBuddy: 'Leif',
        notes: 'Saw a million shipwrecks!'
      },
      {
        location: 'Sund Rock, Hoodsport, WA, USA',
        date: new Date(), 
        time: '1:00pm',
        duration: '2 hours',
        maxDepth: '45 minutes',
        diveBuddy: 'Leif',
        notes: 'Saw a million salmon!'
      }
    ]);
    return request(app)
      .get('/api/v1/dives')
      .then(res => {
        dives.forEach(dive => {
          expect(res.body).toContainEqual({
            _id: dive._id.toString(),
            location: dive.location
          });
        });
      });
  });

  it('can grab a logged dive by id', async() => {
    return request(app)
      .get(`/api/v1/dives/${dive._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Octopus Hole, Hoodsport, WA, USA',
          date: expect.any(String), 
          time: '1:00pm',
          duration: '2 hours',
          maxDepth: '45 minutes',
          diveBuddy: 'Gary',
          notes: 'Saw a million octopuses!',
          __v:0
        });
      });
  });
  it('can update a logged dive', () => {
    return request(app)
      .patch(`/api/v1/dives/${dive.id}`)
      .send({ time: '4:00pm' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Octopus Hole, Hoodsport, WA, USA',
          date: expect.any(String), 
          time: '4:00pm',
          duration: '2 hours',
          maxDepth: '45 minutes',
          diveBuddy: 'Gary',
          notes: 'Saw a million octopuses!',
          __v:0
        });
      });
  });
  it('can delete a logged dive', () => {
    return request(app)
      .delete(`/api/v1/dives/${dive.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Octopus Hole, Hoodsport, WA, USA',
          date: expect.any(String), 
          time: '1:00pm',
          duration: '2 hours',
          maxDepth: '45 minutes',
          diveBuddy: 'Gary',
          notes: 'Saw a million octopuses!', 
          __v: 0
        });
      });
  });
});

  
