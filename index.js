require('./config');
require('./database');
const errorHandler = require('./middlewares/errorHandler');
const ownerExtract = require('./utils/ownerExtract');
const seed = require('./utils/seed');
const Animal = require('./models/animal');
const Owner = require('./models/owner');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const methodOverride = require('method-override');
const path = require('path');
const animalRoutes = require('./routes/animals');
const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/animals', animalRoutes);

app.locals.adopted = false;

// INDEX ROUTE
app.get('', (req, res, next) => {
  Animal.find({}, (error, animals) => {
    if(error) {
      let err = new Error('Animals not found');
      err.status = 404;
      // add error as a parameter to show diff level error message
      next(err);
    } else {
      res.render('index', {animals});
    }
  });
});

// SEED ROUTE
app.get('/seed', (req, res, next) => {
  seed();
  res.send('Database reseeded');
})

app.use(errorHandler);

app.listen(PORT || 3000, () => {
  console.log('Server started on port 3000!');
});
