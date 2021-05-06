/* review controller file */
const mongoose = require('mongoose');
const Review = require('../models/review.model');

module.exports = {
    getReviews,
    getReviewsForLocation,
    getReviewsForUser,
    uploadReview,
    editReview,
    deleteReview
}

/* GET request for ALL reviews
Search for all reviews in database (no filter)

- req endpoint: '/api/review'
- req body: n/a

- res body: [ {review1obj}, {review2obj}, etc. ]

*/
function getReviews(req, res){
    Review.find()
    .then(allReviews => {
        if (!allReviews){
            res.status(404).json({result: 'error', message: 'Reviews not found'});
            return;
        }
        res.status(200).json(allReviews);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

/* GET request for reviews by location
Search for all reviews for a given location

- req endpoint: '/api/review/location/:locationName'
- req body: n/a

- res body: [ {review1obj}, {review2obj}, etc. ]

*/
function getReviewsForLocation(req, res){
    Review.find(req.params) // req.params: {"locationName": "___"}
    .then(locationReviews => {
        res.status(200).json(locationReviews);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

/* GET request for reviews by user
Search for all reviews for a given user

- req endpoint: '/api/review/user/:userNetID'
- req body: n/a

- res body: [ {review1obj}, {review2obj}, etc. ]

*/
function getReviewsForUser(req, res){
    Review.find(req.params) // req.params: {"userNetID": "___"}
    .then(userReviews => {
        res.status(200).json(userReviews);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

/* POST request for review
Upload a new review

- req endpoint: '/api/review'
- req body: {"description": "...", "rating": "...", etc.}

- res body: {result: 'success', message: 'upload review success'}

*/
function uploadReview(req, res){
    console.log('REVIEW.CONTROLLER: upload review');
    const review = new Review(req.body);
    
    review.save()
    .then(newReview => {
        console.log("new review created");
        res.status(201).json({result: 'success', message: 'upload review success'});
    }).catch(err => { // catch errors
        console.log('REVIEW.CONTROLLER: upload review error');
        console.log(err);
        res.status(400).json(err);
    })
}

/* PUT request for editing review
Update an exisitng review given review id

- req endpoint: '/api/review/:_id'
- req body: {"description": "...", "rating": "...", etc.}

- res body: {result: 'success', message: 'Review update successful'}

*/
function editReview(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']); // req.params: {"_id": "_______"}
    Review.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        // check how many reviews were modified (should only be 1)
        if (dbResponse.nModified == 1){
            res.status(200).json({result: 'success', message: 'Review update successful'});
        } else {
            res.status(404).json({result: 'Review not found'});
        }
    }).catch(err => { // catch errors
        res.status(500).json(err.message);
    });
}

/* DELETE request for deleting review
Delete an exisitng review given review id

- req endpoint: '/api/review/:_id'
- req body: n/a

- res body: {result: 'success', message: 'Review deletion successful'}

*/
function deleteReview(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']); // req.params: {"_id": "_______"}
    Review.deleteOne(req.params)
    .then(dbResponse => {
        console.log('review deleted');
        res.status(200).json({result: 'success', message: 'Review deletion successful'});
    }).catch(err => {
        res.status(500).json(err.message);
    })
}