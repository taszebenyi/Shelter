const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dogSchema = mongoose.Schema({
  name: {
    type: String
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
