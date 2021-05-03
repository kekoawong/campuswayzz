/* user controller file */

/* TODO:
1. put user request
    a. make sure password is encrypted when user is updated
2. delete user request
3. post/put/delete/get user location requests
*/

const debuglog = require('../debuglog');
const User = require('../models/user.model');

module.exports = {
    signup,
    login,
    getUserInfo,
    putUserLocation,
    getUserLocation,
    updateUserInfo,
    getAllUserNetIDs
};

/* POST request for new user
Signup a new user into the database

- req endpiont: '/api/signup'
- req body: {"firstName": "___", "lastName": "___", "netID": "___", etc.}

- res body: {result: 'success', message: 'Signup successful'}

*/
function signup(req, res){

    const user = new User(req.body);
    user.save()
    .then(newUser => {
        debuglog('LOG', 'user controller - signup', 'signed up user');
        // const token = createToken(newUser);
        // res.header('auth-token', token);
        // res.status(201).json({result: 'success', message: 'Signup successful', token: token});
        res.status(201).json({result: 'success', message: 'Signup successful'});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - signup', err);
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
    debuglog('LOG', 'user controller - login', 'attempting login');
    
    User.findOne({netID: req.body.netID})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - login', 'user netID not found');
            res.status(404).json({result: 'error', message: 'NetID not found'});
            return;
        }

        // check given password against password in db
        foundUser.checkPassword(req.body.password, (err,result) => {
            if (result) { // correct password
                debuglog('LOG', 'user controller - login', 'found user, correct password');
                // const token = createToken(foundUser);
                // res.header('auth-token', token);
                res.status(200).json({result: 'success', message: 'Login successful'});
            } else { // incorrect password
                debuglog('LOG', 'user controller - login', 'found user, incorrect password');
                res.status(400).json({result: 'error', message: 'Incorrect password'});
            }
        });
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - login', err);
        res.status(401).json(err);
        return;
    });
}

function getUserInfo(req, res){
    User.findOne(req.params)
    .then(userData => {
        if (userData){
            debuglog('LOG', 'user controller - getUserInfo', 'got user info');
            res.status(200).json(userData);
        } else {
            debuglog('LOG', 'user controller - getUserInfo', 'user not found');
            res.status(200).json({result: 'error', message: 'User not found'});
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getUserInfo', err);
        res.status(401).json(err);
        return;
    })
}

function updateUserInfo(req, res){
    User.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        debuglog('LOG', 'user controller - updateUserInfo', 'updated user info');
        res.status(200).json({result: 'success', message: 'User update successful'});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - updateUserInfo', err);
        res.status(500).json(err.message);
    });
}

function putUserLocation(req, res){
    User.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {

        debuglog('LOG', 'user controller - putUserLocation', 'updated user location');
        res.status(200).json({ result: 'success', message: 'User location update successful' });
        
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - putUserLocation', err);
        res.status(500).json(err.message);
    });
}

function getUserLocation(req, res){
    User.find(req.params) // req.params: {"netID": "___"}
    .then(dbResponse => {
        debuglog('LOG', 'user controller - getUserLocation', 'got user location');
        res.status(200).json(dbResponse[0]["coordinates"]);
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getUserLocation', err);
        res.status(401).json(err);
        return;
    })
}

function getAllUserNetIDs(req, res){
    User.find()
    .then(dbResponse => {
        let netIDs = [];
        for (const i in dbResponse){
            netIDs.push({'netID': dbResponse[i]['netID']});
        }
        debuglog('LOG', 'user controller - getAllUserNetIDs', 'got all user netIDs');
        res.status(201).json(netIDs);
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getAllUserNetIDs', err);
        res.status(401).json(err);
        return;
    })
}