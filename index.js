require('./config');
require('./database');
const errorHandler = require('./middlewares/errorHandler');
const Animal = require('./models/animal');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.get('', (req, res, next) => {
  Animal.find({}, (error, animals) => {
    if(error) {
      let err = new Error('Posts not found');
      err.status = 404;
      // add error as a parameter to show diff level error message
      next(err);
    } else {
      res.render('index', {animals});
    }
  });
});

app.get('/animals/:id')

app.get('/animals/:id', (req, res, next) => {
  Animal.findById(req.params.id, (error, animal) => {
    if(error) {
      let err = new Error('Animal by specified ID not found');
      err.status = 404;
      next(err);
    }

    res.render('show', {animal});
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
