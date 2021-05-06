/* review model (schema) file */
const mongoose = require('mongoose');

// import global options
const options = require('../options.json');
const buildingTypes = options['Location.types'];

const reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    userNetID: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    locationType: {
        type: String,
        enum: buildingTypes,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('review', reviewSchema);