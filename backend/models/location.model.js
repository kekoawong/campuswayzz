const mongoose = require('mongoose');

const buildingTypes = ['Restaurant', 'Study Space', 'Recreation', 'R&R', 'Other'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
        required: true,
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
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
    }]
});

module.exports = mongoose.model('location', locationSchema);