const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// db.once("open", () => {
//   console.log("Connection to database succeeded!");
// });
