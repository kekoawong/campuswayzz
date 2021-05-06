/* user model (schema) file */

/* TODO:
1. make sure password is encrypted when user is updated
*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // use bcrypt for password encryption

// import global options
const options = require('../options.json');
const privacyOptions = options['User.privacyOptions'];

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
    password: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        enum: privacyOptions,
        required: true
    },
    coordinates: {
        latitude: {
            type: Number,
            default: 41.70307706874321
        },
        longitude: {
            type: Number,
            default: -86.23898524167699
        }
    },
    // friends: [{
    //     friendNetID: {
    //         type: String,
    //         required: true
    //     }
    // }]
});

/* encrypt password before saving user */
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
})

/* check password using bcrypt compare when user attempts login*/
userSchema.methods.checkPassword = function(password, params) {
    bcrypt.compare(password, this.password, params);
}

module.exports = mongoose.model('user', userSchema);