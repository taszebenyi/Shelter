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
    image: '/images/brown_cat.jpg',
    comment: 'Likes mice',
    chipID: '04a529541620f135e422e647e9ccd8a7',
    adopted: false,
    // birthDate: new Date(2016,03,30),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: new ObjectID(),
    species: 'Cat',
    name: 'Lucy',
    color: 'grey',
    image: '/images/grey_cat.jpg',
    adopted: false,
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
    image: '/images/grey_dog.jpg',
    comment: 'Always happy',
    chipID: 'f7ade104e06f26c06e9b87218fd13c56',
    adopted: false,
    // birthDate: new Date(2019,01,08),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: new ObjectID(),
    species: 'Dog',
    name: 'Rusty',
    color: 'Brown',
    image: '/images/brown_dog.jpg',
    comment: 'Barking enthusiast',
    chipID: 'b05fc05741aad91c20ff49387090dd34',
    adopted: false,
    // birthDate: new Date(2013, 03, 10),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: new ObjectID(),
    species: 'Dog',
    name: 'Max',
    color: 'white',
    image: '/images/white_dog.jpg',
    adopted: true,
    chipID: 'c05fc05741aad91c20ff49387090das4',
    // comment:,
    // chipID:,
    // birthDate: new Date(2017,02,11),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: new ObjectID(),
    species: 'Cat',
    name: 'Pawn',
    color: 'white',
    image: '/images/white_cat.jpg',
    adopted: true,
    chipID: '665fc05741aad91c20ff49387090asfa',
    // comment:,
    // chipID:,
    // birthDate: new Date(2017,02,11),
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
