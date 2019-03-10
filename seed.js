const config = require('./config');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const Animal = require('./models/animal');
const Owner = require('./models/owner');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", () => {
  console.log("Connection to database succeeded");
});

let seedAnimalID0 = new ObjectID();
let seedAnimalID1 = new ObjectID();
let seedAnimalID2 = new ObjectID();
let seedAnimalID3 = new ObjectID();
let seedAnimalID4 = new ObjectID();
let seedAnimalID5 = new ObjectID();

let seedOwnerID0 = new ObjectID();
let seedOwnerID1 = new ObjectID();

let seedAnimals =
[
  {
    _id: seedAnimalID0,
    species: 'Cat',
    name: 'Fred',
    color: 'Brown',
    image: '/images/brown_cat.jpg',
    comment: 'Likes mice',
    chipID: '04a529541620f135e422e647e9ccd8a7',
    adopted: false,
    birthDate: new Date(2016,03,30),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: seedAnimalID1,
    species: 'Cat',
    name: 'Lucy',
    color: 'grey',
    image: '/images/grey_cat.jpg',
    adopted: false,
    // comment:,
    // chipID:,
    birthDate: new Date(2017,02,11),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: seedAnimalID2,
    species: 'Dog',
    name: 'Bono',
    color: 'grey',
    image: '/images/grey_dog.jpg',
    comment: 'Always happy',
    chipID: 'f7ade104e06f26c06e9b87218fd13c56',
    adopted: false,
    birthDate: new Date(2019,01,08),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: seedAnimalID3,
    species: 'Dog',
    name: 'Rusty',
    color: 'Brown',
    image: '/images/brown_dog.jpg',
    comment: 'Barking enthusiast',
    chipID: 'b05fc05741aad91c20ff49387090dd34',
    adopted: false,
    birthDate: new Date(2013,03,10),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: seedAnimalID4,
    species: 'Dog',
    name: 'Max',
    color: 'white',
    image: '/images/white_dog.jpg',
    adopted: true,
    owner: seedOwnerID0,
    chipID: 'c05fc05741aad91c20ff49387090das4',
    // comment:,
    // chipID:,
    birthDate: new Date(2017,02,11),
    createdAt: new Date(2019,01,08)
  },
  {
    _id: seedAnimalID5,
    species: 'Cat',
    name: 'Pawn',
    color: 'white',
    image: '/images/white_cat.jpg',
    adopted: true,
    owner: seedOwnerID1,
    chipID: '665fc05741aad91c20ff49387090asfa',
    // comment:,
    // chipID:,
    birthDate: new Date(2017,03,11),
    createdAt: new Date(2019,01,08)
  }
]

let seedOwners =
[
  {
    _id: seedOwnerID0,
    name: 'Bill Hudson',
    contact: {
      zipCode: '34112',
      city: 'Oakville',
      street: 'Old',
      houseNumber: '22'
    },
    comment: 'Likes dogs'
  },
  {
    _id: seedOwnerID1,
    name: 'Martha Smith',
    contact: {
      zipCode: '48932',
      city: 'Springfield',
      street: 'Long',
      houseNumber: '93217'
    },
    comment: 'Likes cats'
  }
]

function seedDatabase() {
  Owner.deleteMany({})
  .then(() => {
    return Owner.insertMany(seedOwners);
  })
  .catch((err) => {
    console.log(err)
  });

  Animal.deleteMany({})
  .then(() => {
    return Animal.insertMany(seedAnimals);
  })
  .then(() => {
    console.log('Seeding database completed')
  })
  .catch((err) => {
    console.log(err);
  });
}

seedDatabase();
