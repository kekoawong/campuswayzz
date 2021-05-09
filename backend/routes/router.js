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
    console.log('[LOG]::Router Test');
    res.json({'result': 'router test success'});
});

// users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/user/:netID', usersCtrl.getUserInfo);
router.put('/user/:netID', usersCtrl.updateUserInfo);
router.put('/user/location/:netID', usersCtrl.putUserLocation);
router.get('/user/location/:netID', usersCtrl.getUserLocation);
router.get('/user/netIDs/all/:userNetID', usersCtrl.getAllUserNetIDs);

// reviews
router.get('/review', reviewsCtrl.getReviews);
router.get('/review/location/:locationName', reviewsCtrl.getReviewsForLocation);
router.get('/review/user/:userNetID', reviewsCtrl.getReviewsForUser);
router.post('/review', reviewsCtrl.uploadReview);
router.put('/review/:_id', reviewsCtrl.editReview);
router.delete('/review/:_id', reviewsCtrl.deleteReview);

// locations
router.post('/location', locationsCtrl.postLocation);
router.get('/locations', locationsCtrl.getAllLocations)
router.get('/locations/:type', locationsCtrl.getLocationsForType);
router.get('/location/names/all', locationsCtrl.getAllLocationNames);
router.put('/location/:name', locationsCtrl.putLocationInfo);

// meetups
router.post('/meetup', meetupsCtrl.postMeetup);
router.get('/meetup/:_id/location', meetupsCtrl.getMeetupLocation);
router.get('/meetup/:_id/friends/:userNetID', meetupsCtrl.getFriendsLocations);
router.put('/meetup/:_id/userstatus', meetupsCtrl.updateUserStatus);
router.delete('/meetup', meetupsCtrl.meetupCleaner);

module.exports = router;
