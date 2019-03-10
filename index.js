require('./config');
require('./database');
const errorHandler = require('./middlewares/errorHandler');
const ownerExtract = require('./utils/ownerExtract');
const Animal = require('./models/animal');
const Owner = require('./models/owner');
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

// !!
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

// NEW ROUTE
app.get('/animals/new', (req, res, next) => {
  res.render('new');
});

// CREATE ROUTE
app.post('/animals', (req, res, next) => {
  Animal.create(req.body.animal, (error, animal) => {

    if(error) {
      let err = new Error('Animal could not be created');
      err.status = 500;
      next(error);
    } else {
      res.redirect('/');
    }
  });
});

// ONLY SHELTERED ROUTE
app.get('/animals/sheltered', (req, res, next) => {
  Animal.find({adopted: false}, (error, animals) => {
    if(error) {
      let err = new Error('Animals not found');
      err.status = 404;
      // add error as a parameter to show diff level error message
      next(err);
    } else {
      res.render('sheltered', {animals});
    }
  });
});

// ONLY ADOPTED ROUTE
app.get('/animals/adopted', (req, res, next) => {
  Animal.find({adopted: true}, (error, animals) => {
    if(error) {
      let err = new Error('Animals not found');
      err.status = 404;
      // add error as a parameter to show diff level error message
      next(err);
    } else {
      res.render('adopted', {animals});
    }
  });
});

// SHOW ROUTE
app.get('/animals/:id', (req, res, next) => {
  Animal.findById(req.params.id, (error, animal) => {
    if(error) {
      let err = new Error('Animals by specified ID not found');
      err.status = 404;
      next(err);
    }
    res.render('show', {animal});
  });
});

// ADOPT GET ROUTE
app.get('/animals/:id/adopt', (req, res, next) => {
  Animal.findById(req.params.id, (error, animal) => {
    if(error) {
      let err = new Error('Animal by specified ID not found');
      err.status = 404;
      next(err);
    } else {
      res.render('adopt', {animal});
    }
  });
});

// ADOPT PUT ROUTE
app.put('/animals/:id/adopt', (req, res, next) => {
  let owner = ownerExtract(req.body);

  Owner.create(owner)
  .then((owner) => {
    return Animal.findOneAndUpdate({_id: new ObjectID(req.params.id)}, {adopted: true, ownerID: owner._id}, {useFindAndModify: false, new: true, /*runValidators: true*/})
  })
  .then((animal) => {
    res.redirect('/animals/adopted');
  }).catch((error) => {
    next(error);
  });
});

// SHOW EDIT ROUTE
app.get('/animals/:id/edit', (req, res, next) => {
  Animal.findById(req.params.id, (error, animal) => {
    if(error) {
      let err = new Error('Animal by specified ID not found');
      err.status = 404;
      next(err);
    } else {
      res.render('edit', {animal});
    }
  });
});

// EDIT ROUTE
app.put('/animals/:id', (req, res, next) => {
  Animal.findOneAndUpdate({_id: new ObjectID(req.params.id)}, req.body.animal, {useFindAndModify: false, new: true, runValidators: true}, (error, animal) => {

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

app.listen(port, () => {
  console.log('Server started on port 3000!');
});
