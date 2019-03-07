const config = require('./config');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const Animal = require('./models/animal')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.once("open", () => {
  console.log("Connection to database succeeded!");
});

let seedAnimals = [
  {
    _id: new ObjectID(),
    species: 'Cat',
    name: 'Fred',
    color: 'Brown',
    image: 'https://goo.gl/Abe7K2',
    comment: 'Likes mice',
    chipID: '04a529541620f135e422e647e9ccd8a7',
    // birthDate: new Date(2016,03,30),
    // registrationDate:
  },
  {
    _id: new ObjectID(),
    species: 'Cat',
    name: 'Lucy',
    color: 'grey',
    image: 'https://goo.gl/Qi9gyi',
    // comment:,
    // chipID:,
    // birthDate: new Date(2017,02,11),
    // registrationDate:
  },
  {
    _id: new ObjectID(),
    species: 'Dog',
    name: 'Bono',
    color: 'black',
    image: 'https://goo.gl/5aPbo1',
    comment: 'Likes to jump',
    chipID: 'f7ade104e06f26c06e9b87218fd13c56',
    // birthDate: new Date(2018,08,08),
    // registrationDate:
  },
  {
    _id: new ObjectID(),
    species: 'Dog',
    name: 'Rusty',
    color: 'Brown',
    image: 'https://goo.gl/2unsia',
    comment: 'Barking enthusiast',
    chipID: 'b05fc05741aad91c20ff49387090dd34',
    // birthDate: new Date(2013, 03, 10),
    // registrationDate:
  }
]

function seedDb() {
  Animal.deleteMany({})
  .then(() => {
    return Animal.insertMany(seedAnimals);
  })
  .catch((err) => {
    console.log(err);
  })
}

seedDb();
