const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model('review', reviewSchema);