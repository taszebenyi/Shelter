const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const animalSchema = mongoose.Schema({
  species: {
    type: String,
    enum: ['Cat', 'Dog'],
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
    required: function() { return this.species === 'Dog'; }
  },
  adopted: {
    type: Boolean,
    default: false,
    required: true
  }
  // birthDate: {
  //   type: Date,
  //   required: true
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   validate: {
  //     validator: function(date) {
  //       return date <= Date.now
  //     },
  //     message: function(props) { `${props.value} a mai datum utan van` }
  //   }
  // }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
