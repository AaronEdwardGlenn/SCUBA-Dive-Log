const { Router } = require('express');
const Dives = require('../lib/modles/Dives');
const ensureAuth = require('../lib/middleware/ensure-auth');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', ensureAuth, (req, res) => {
    Dives
      .create(req.body)
      .then(dive => res.send(dive));
  })

  .get('/', ensureAuth, (req, res) => {
    let diveQuery = {};
    Dives
      .find(diveQuery)
      .select({ location: true })
      .then(dives => res.send(dives));
  })
  .get('/:id', ensureAuth, (req, res) => {
    Promise.all([
      Dives.findById(req.params.id)
    ])
      .then(([dive]) => res.send ({ ...dive.toJSON() }));
  })
  .patch('/:id', ensureAuth, (req, res) => {
    Dives
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(dive => res.send(dive));
  })
  .delete('/:id', ensureAuth, (req, res) => {
    Promise.all([Dives.findByIdAndDelete(req.params.id)])
      .then(([dive]) => res.send(dive));
   
  });
