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

function getReviews(req, res){
    Review.find()
    .then(allReviews => {
        if (!allReviews){
            res.status(404).json({result: 'error', message: 'Reviews not found'});
            return;
        }
        res.status(200).json(allReviews);
    }).catch(err => {
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

function getReviewsForLocation(req, res){
    Review.find(req.params)
    .then(locationReviews => {
        res.status(200).json(locationReviews);
    }).catch(err => {
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

function getReviewsForUser(req, res){

}

function uploadReview(req, res){
    console.log('MENU.CONTROLLER: upload review');
    const review = new Review(req.body);
    
    review.save()
    .then(newReview => {
        console.log("new review created");
        res.status(201).json({result: 'success', message: 'upload review success'});
    }).catch(err => {
        console.log('MENU.CONTROLLER: upload review error');
        console.log(err);
        res.status(400).json(err);
    })
}

/* edit review */
function editReview(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']);
    Review.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        if (dbResponse.nModified == 1){
            res.status(200).json({result: 'success', message: 'Review update successful'});
        } else {
            res.status(404).json({result: 'Review not found'});
        }
    }).catch(err => {
        res.status(500).json(err.message);
    });
}

function deleteReview(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']);
    Review.deleteOne(req.params)
    .then(dbResponse => {
        console.log('review deleted');
        res.status(200).json({result: 'success', message: 'Review deletion successful'});
    }).catch(err => {
        res.status(500).json(err.message);
    })
}