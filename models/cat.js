const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const catSchema = mongoose.Schema({
  name: {
    type: String
  }
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
