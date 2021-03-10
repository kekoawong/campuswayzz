const mongoose = require('mongoose');

const privacyOptions = ['Share indefinitely', 'Share while using', 'Never share'];

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    netID: {
        type: String,
        required: true,
        unique: true
    },
    privacy: {
        type: String,
        enum: privacyOptions,
        required: true
    },
    coordinates: {
        type: String
    },
    friends: [{
        friendNetID: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('user', userSchema);