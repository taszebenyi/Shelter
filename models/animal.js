const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const animalSchema = mongoose.Schema({
  species: {
    type: String,
    enum: ['cat', 'dog'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  comment: {
    type: String
  },
  chipID: {
    type: String,
    maxlength: 50,
    required: function() { return this.species === 'dog'; }
  },
  adopted: {
    type: Boolean,
    default: false,
    required: true
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
  },
  birthDate: {
    type: Date,
    required: true,
    validate: {
      validator: (date) => {
        return date < Date.now();
      },
      message: 'You can not specify a date in the future'
    }
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: (date) => {
        return date < Date.now();
      },
      message: 'You can not specify a date in the future'
    }
  }
});

animalSchema.pre('validate', function(next) {
  let animal = this;

  animal.species = animal.species.toLowerCase();
  next();
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
