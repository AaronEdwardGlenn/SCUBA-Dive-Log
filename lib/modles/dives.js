const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  maxDepth: {
    type: String,
    required: true
  },
  diveBuddy: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Dives', schema);

