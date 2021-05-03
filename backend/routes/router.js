/* router file */
const express = require('express');
const router = express.Router();

/* link controllers */
const usersCtrl = require('../controllers/user.controller');
const reviewsCtrl = require('../controllers/review.controller');
const locationsCtrl = require('../controllers/location.controller');
const meetupsCtrl = require('../controllers/meetup.controller');

/* route endpoints */
router.get('/test', (req, res) => {
    res.json({'result': 'test success'});
    console.log('test sup');
});

// users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/user/:netID', usersCtrl.getUserInfo);
router.put('/user/:netID', usersCtrl.updateUserInfo);
router.put('/user/location/:netID', usersCtrl.putUserLocation);
router.get('/user/location/:netID', usersCtrl.getUserLocation);
router.get('/user/netIDs', usersCtrl.getUserNetIDs);

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

// meetups
router.post('/meetup', meetupsCtrl.postMeetup);
router.get('/meetup/:_id/location', meetupsCtrl.getMeetupLocation);
router.get('/meetup/:_id/friends', meetupsCtrl.getFriendsLocations);

module.exports = router;
