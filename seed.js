const config = require('./config');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const Animal = require('./models/animal')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", () => {
  console.log("Connection to database succeeded");
});

let seedAnimals = [
  {
    _id: new ObjectID(),
    species: 'Cat',
    name: 'Fred',
    color: 'Brown',
    image: 'https://goo.gl/DDwPiM',
    comment: 'Likes mice',
    chipID: '04a529541620f135e422e647e9ccd8a7',
    // birthDate: new Date(2016,03,30),
    createdAt: new Date(2019,01,08)
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
    createdAt: new Date(2019,01,08)
  },
  {
    _id: new ObjectID(),
    species: 'Dog',
    name: 'Bono',
    color: 'grey',
    image: 'https://goo.gl/4pTQ9F',
    comment: 'Usually sad',
    chipID: 'f7ade104e06f26c06e9b87218fd13c56',
    // birthDate: new Date(2019,01,08),
    createdAt: new Date(2019,01,08)
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
    createdAt: new Date(2019,01,08)
  }
]

function seedDatabase() {
  Animal.deleteMany({})
  .then(() => {
    return Animal.insertMany(seedAnimals);
  })
  .then(() => {
    console.log('Seeding database completed')
  })
  .catch((err) => {
    console.log(err);
  })
}

seedDatabase();
