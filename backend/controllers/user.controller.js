const User = require('../models/user.model');

module.exports = {
    signup,
    login,
    getUserLocation
};

function signup(req, res){
    console.log('USER.CONTROLLER: Signing up');
    console.log(req.body);
    const user = new User(req.body);
    user.save()
    .then(newUser => {
        console.log("new user created");
        // const token = createToken(newUser);
        // res.header('auth-token', token);
        // res.status(201).json({result: 'success', message: 'Signup successful', token: token});
        res.status(201).json({result: 'success', message: 'Signup successful'});
    }).catch(err => {
        console.log('USER.CONTROLLER: signup error');
        console.log(err);
        res.status(400).json(err);
    });   
}

function login(req, res){
    console.log('USER.CONTROLLER: Logging in');
    console.log(req.body)
    User.findOne({netID: req.body.netID})
    .then(foundUser => {
        if (!foundUser){
            res.status(404).json({result: 'error', message: 'NetID not found'});
            return;
        }

        foundUser.checkPassword(req.body.password, (err,result) => {
            if (result){
                console.log('Found user: Correct password');
                // const token = createToken(foundUser);
                // res.header('auth-token', token);
                res.status(200).json({result: 'success', message: 'Login successful'});
            } else {
                console.log('Found user: Incorrect password');
                res.status(400).json({result: 'error', message: 'Incorrect password'});
            }
        });
    }).catch(err => {
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    });
}

function getUserLocation(req, res){
    
}