/* user controller file */

/* TODO:
1. put user request
    a. make sure password is encrypted when user is updated
2. delete user request
3. post/put/delete/get user location requests
*/

const User = require('../models/user.model');

module.exports = {
    signup,
    login,
    getUserInfo,
    putUserLocation,
    getUserLocation,
    updateUserInfo
};

/* POST request for new user
Signup a new user into the database

- req endpiont: '/api/signup'
- req body: {"firstName": "___", "lastName": "___", "netID": "___", etc.}

- res body: {result: 'success', message: 'Signup successful'}

*/
function signup(req, res){
    console.log('USER.CONTROLLER: Signing up');

    const user = new User(req.body);
    user.save()
    .then(newUser => {
        console.log("new user created");
        // const token = createToken(newUser);
        // res.header('auth-token', token);
        // res.status(201).json({result: 'success', message: 'Signup successful', token: token});
        res.status(201).json({result: 'success', message: 'Signup successful'});
    }).catch(err => { // catch errors
        console.log('USER.CONTROLLER: signup error');
        console.log(err);
        res.status(400).json(err);
    });   
}

/* POST request for logging in existing user
Login an existing user

- req endpoint: '/api/login'
- req body: {"netID": "___", "password": "___"}

- res body: 
    if login is successful,
        {result: 'success', message: 'Login successful'}
    if login is unsuccessful (incorrect pw), 
        {result: 'error', message: 'Incorrect password'}

*/
function login(req, res){
    console.log('USER.CONTROLLER: Logging in');
    
    User.findOne({netID: req.body.netID})
    .then(foundUser => {
        if (!foundUser){
            res.status(404).json({result: 'error', message: 'NetID not found'});
            return;
        }

        // check given password against password in db
        foundUser.checkPassword(req.body.password, (err,result) => {
            if (result){ // correct password
                console.log('Found user: Correct password');
                // const token = createToken(foundUser);
                // res.header('auth-token', token);
                res.status(200).json({result: 'success', message: 'Login successful'});
            } else { // incorrect password
                console.log('Found user: Incorrect password');
                res.status(400).json({result: 'error', message: 'Incorrect password'});
            }
        });
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    });
}

function getUserInfo(req, res){
    User.findOne(req.params)
    .then(userData => {
        if (userData){
            res.status(200).json(userData);
        } else {
            res.status(404).json({result: 'error', message: 'User not found'});
        }
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

function updateUserInfo(req, res){
    User.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        res.status(200).json({result: 'success', message: 'User update successful'});
    }).catch(err => { // catch errors
        res.status(500).json(err.message);
    });
}

function putUserLocation(req, res){
    User.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        
        res.status(200).json({ result: 'success', message: 'User location update successful' });
        
    }).catch(err => { // catch errors
        res.status(500).json(err.message);
    });
}

function getUserLocation(req, res){
    User.find(req.params) // req.params: {"netID": "___"}
    .then(dbResponse => {
        console.log('getUserLoc');
        console.log(dbResponse[0]["coordinates"]);
        res.status(200).json(dbResponse[0]["coordinates"]);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}
