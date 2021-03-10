const express = require('express');
const router = express.Router();

/* link controllers */
const usersCtrl = require('../controllers/user.controller');
const reviewsCtrl = require('../controllers/review.controller');
const locationCtrl = require('../controllers/location.controller');

/* route endpoints */

// users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

// reviews

// locations

module.exports = router;