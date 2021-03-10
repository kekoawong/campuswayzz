const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        type: String
    },
    friends: [{
        friendNetID: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
})

userSchema.methods.checkPassword = function(password, params) {
    bcrypt.compare(password, this.password, params);
}

module.exports = mongoose.model('user', userSchema);