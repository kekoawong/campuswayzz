const mongoose = require('mongoose');

const buildingTypes = ['Restaurant', 'Study Space', 'Recreation', 'R&R'];

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
        type: String,
        required: true
    },
    hoursOfOperation: [{
        day: {
            type: String,
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