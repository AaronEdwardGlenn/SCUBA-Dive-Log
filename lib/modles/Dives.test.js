const mongoose = require('mongoose');
const Dives = require('./Dives');

describe('Dives model tests', () => {
  it('contains a location', () => {
    const dive = new Dives();
    const { errors } = dive.validateSync();

    expect(errors.location.message).toEqual('Path `location` is required.');
  });
  
  it('contains all necessary peramiters', () => {
    let dive = new Dives({
      location: 'Octopus Hole, Hoodsport, WA, USA',
      date: new Date(), 
      time: '1:00pm',
      duration: '2 hours',
      maxDepth: '45 minutes',
      diveBuddy: 'Gary',
      notes: 'Saw a million octopuses!'
    });
    expect(dive.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      location: 'Octopus Hole, Hoodsport, WA, USA',
      date: expect.any(Date), 
      time: '1:00pm',
      duration: '2 hours',
      maxDepth: '45 minutes',
      diveBuddy: 'Gary',
      notes: 'Saw a million octopuses!'
    });
  });
});
