/* location model (schema) file */
const mongoose = require('mongoose');

// import global options
const options = require('../options.json');
const buildingTypes = options['Location.types'];
const days = options['Location.days'];

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: buildingTypes,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }/*,
    hoursOfOperation: [{
        day: {
            type: String,
            enum: days,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }]*/
});

module.exports = mongoose.model('location', locationSchema);
