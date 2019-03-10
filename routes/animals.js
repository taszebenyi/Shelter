const express = require('express');
const router = express.Router();
const ownerExtract = require('../utils/ownerExtract');
const Animal = require('../models/animal');
const Owner = require('../models/owner');

// NEW ROUTE
router.get('/new', (req, res, next) => {
  res.render('new');
});

// CREATE ROUTE
router.post('/', (req, res, next) => {
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
router.get('/sheltered', (req, res, next) => {
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
router.get('/adopted', (req, res, next) => {
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
router.get('/:id', (req, res, next) => {
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
router.get('/:id/adopt', (req, res, next) => {
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
router.put('/:id/adopt', (req, res, next) => {
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
router.get('/:id/edit', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
  Animal.findOneAndDelete({_id: new ObjectID(req.params.id)}, (error, animal) => {
    if(error) {
      let err = new Error('Animal could not be deleted');
      err.status = 500;
      next(err);
    }
    res.redirect('/');
  });
});


module.exports = router;
