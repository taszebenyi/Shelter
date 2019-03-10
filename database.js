const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;
console.log('***********************')
console.log('***********************')
console.log('***********************')
console.log('***********************')
console.log(process.env.MONGODB_URI)
console.log('***********************')
console.log('***********************')
console.log('***********************')
console.log('***********************')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", () => {
  console.log("Connection to database succeeded!");
});
