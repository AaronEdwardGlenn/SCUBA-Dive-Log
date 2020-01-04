const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: 'string',
  date: Date(),
  time: String,
  duration: String,
  maxDepth: String,
  diveBuddy: String,
  notes: String
});

module.exports = mongoose.model('dives', schema);

