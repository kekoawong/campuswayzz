/* meetup model (schema) file */
const mongoose = require('mongoose');

// import global options
const options = require('../options.json');
const friendStatus = options['Meetup.friendStatus']

const meetupSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    friends: [{
        netID: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
		default: 'Pending',
            enum: friendStatus
        }
    }]
});

module.exports = mongoose.model('meetup', meetupSchema);
