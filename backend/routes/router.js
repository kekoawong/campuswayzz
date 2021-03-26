/* router file */
const express = require('express');
const router = express.Router();

/* link controllers */
const usersCtrl = require('../controllers/user.controller');
const reviewsCtrl = require('../controllers/review.controller');
const locationsCtrl = require('../controllers/location.controller');

/* route endpoints */

// users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

// reviews
router.get('/review', reviewsCtrl.getReviews);
router.get('/review/location/:locationName', reviewsCtrl.getReviewsForLocation);
router.get('/review/user/:userNetID', reviewsCtrl.getReviewsForUser);
router.post('/review', reviewsCtrl.uploadReview);
router.put('/review/:_id', reviewsCtrl.editReview);
router.delete('/review/:_id', reviewsCtrl.deleteReview);

// locations
router.post('/location', locationsCtrl.postLocation);
router.get('/locations', locationsCtrl.getLocations)
router.get('/locations/:type', locationsCtrl.getLocationsForType);

module.exports = router;