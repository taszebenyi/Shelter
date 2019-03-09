require('./config');
require('./database');
const errorHandler = require('./middlewares/errorHandler');
const Animal = require('./models/animal');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const methodOverride = require('method-override');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// INDEX ROUTE
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

// SHOW ROUTE
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

// ADOPT ROUTE
// MIGHT NOT BE TO EFFICIENT TO FETCH AGAIN FROM DB
// app.get('/animals/:id/adopt', (req, res, next) => {
//   Animal.findById(req.params.id, (error, animal) => {
//     if(error) {
//       let err = new Error('Animal by specified ID not found');
//       err.status = 404;
//       next(err);
//     }
//     res.render('adopt', {animal});
//   });
// });

// SHOW EDIT ROUTE
app.get('/animals/:id/edit', (req, res, next) => {
  Animal.findById(req.params.id, (error, animal) => {
    if(error) {
      let err = new Error('Animal by specified ID not found');
      err.status = 404;
      next(err);
    }
    res.render('edit', {animal});
  });
});

// EDIT ROUTE
app.put('/animals/:id', (req, res, next) => {

  // make sure to run validators
  Animal.findOneAndUpdate( {_id: new ObjectID(req.params.id)}, req.body.animal, {useFindAndModify: false, new: true, runValidators: true}, (error, ani) => {

    // error - to see validator err
    // err - to see custom-made err
    if(error) {
      let err = new Error('Animal could not be edited');
      err.status = 500;
      next(error);
    } else {
      res.redirect('/animals/' + req.params.id);
    }
  });
})

// DELETE ROUTE
app.delete('/animals/:id', (req, res, next) => {
  Animal.findOneAndDelete({_id: new ObjectID(req.params.id)}, (error, animal) => {
    if(error) {
      let err = new Error('Animal could not be deleted');
      err.status = 500;
      next(err);
    }
    res.redirect('/');
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
