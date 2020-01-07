const { Router } = require('express');
const ensureAuth = require('../lib/middleware/ensure-auth');
const User = require('../lib/modles/User');

const MAX_AGE_IN_MS = 24 * 60 * 60 * 1000;

const setSessionCookie = (res, token) => {
  res.cookie('session', token, {
    maxAge: MAX_AGE_IN_MS
  });
};

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/signup', (req, res, next) => {
    console.log('insignup', req.body);
    
    User
      .create(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  // eslint-disable-next-line no-unused-vars
  .get('/verify', ensureAuth, (req, res, next) => {
    console.log(req.user);
    
    res.send(req.user)
      .catch(next);
  });
