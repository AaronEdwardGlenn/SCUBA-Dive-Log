const { Router } = require('express');
const Dives = require('../lib/modles/Dives');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', (req, res) => {
    Dives
      .create(req.body)
      .then(dive => res.send(dive));
  })

  .get('/', (req, res) => {
    let diveQuery = {};
    Dives
      .find(diveQuery)
      .select({ location: true })
      .then(dives => res.send(dives));
  })
  .get('/:id', (req, res) => {
    Promise.all([
      Dives.findById(req.params.id)
    ])
      .then(([dive]) => res.send ({ ...dive.toJSON() }));
  })
  .patch('/:id', (req, res) => {
    Dives
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(dive => res.send(dive));
  })
  .delete('/:id', (req, res) => {
    Promise.all([Dives.findByIdAndDelete(req.params.id)])
      .then(([dive]) => res.send(dive));
   
  });
