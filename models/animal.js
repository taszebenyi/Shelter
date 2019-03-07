const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const animalSchema = mongoose.Schema({
  species: {
    type: String,
    enum: ['Cat', 'Dog'],
    required: true
  }
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  chipID: {
    type: String,
    maxlength: 50,
    required: function() { return this.species === 'Dog'; }
  },
  birthDate: {
    type: Date,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
