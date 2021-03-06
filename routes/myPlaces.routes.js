const Places = require("../models/Places.model");
const User = require('../models/User.model');
const uploader = require('../config/cloudinary.config.js');
const router = require("express").Router();


//USER CAN EDIT OR DELETE PLACES ADDED BEFORE

//EDIT
router.get('/myPlaces/:placesAddedId/edit', (req, res, next) => {
    const {placesAddedId} = req.params;
    res.render('places/edit.hbs', {placesAddedId})
  });

router.post('/myPlaces/:placesAddedId/edit',uploader.single("image"), (req, res, next) => {
    const {placesAddedId} = req.params
    const {latitude, longitude, place, description} = req.body;

    if(!latitude || !longitude) {
        res.render('places/add.hbs', {error: 'Please pick the location on the map'});
        return
      }
      if(place == "Choose...") {
        res.render('places/add.hbs', {error: 'Please select the type of place'});
        return
      }
      if(!description) {
        res.render('places/add.hbs', {error: 'Please add a small description'});
        return
      }
    

    let image
    if (!req.file){
        image = '/images/default.png'
    }
    else {
        image = req.file.path
    }

    Places.findByIdAndUpdate(placesAddedId, {latitude, longitude, place, description, image})
    .then(() => {
        res.redirect('/profile')
    })
    .catch(() => {
        next('Place not edited') 
    })
  });
  
//DELETE
router.post('/myPlaces/:placesAddedId/delete', (req, res, next) => {
    const {placesAddedId} = req.params
    Places.findByIdAndDelete(placesAddedId)
    .then(() => {
        res.redirect('/profile')
    })
    .catch(() => {
        next('Place not deleted')
    })
  });


  module.exports = router;
  