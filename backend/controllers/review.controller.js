const Review = require('../models/review.model');

module.exports = {
    getReviewsForLocation,
    getReviewsForUser,
    uploadReview,
    editReview,
    deleteReview
}

function getReviewsForLocation(req, res){

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

function editReview(req, res){

}

function deleteReview(req, res){

}