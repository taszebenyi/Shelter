const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ownerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    zipCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    houseNumber: {
      type: String,
      required: true
    }
  },
  adoptedAnimals: [{
    type: Schema.Types.ObjectId,
    ref: 'Animal'
  }],
  comment: {
    type: String
  }
});

const Owner = mongoose.model('Owner', animalSchema);

module.exports = Owner;
