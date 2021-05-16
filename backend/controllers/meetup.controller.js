/* meetup controller file */
const mongoose = require('mongoose');
const Meetup = require('../models/meetup.model');
const Location = require('../models/location.model');
const User = require('../models/user.model');
const reviewModel = require('../models/review.model');
const debuglog = require('../debuglog');

module.exports = {
    postMeetup,
    getMeetupLocation,
    getFriendsLocations,
    updateUserStatus,
    meetupCleaner,
    getUsersAcceptedMeetups,
    getUsersPendingMeetups
}

/* POST request for meetup

*/
function postMeetup(req, res){
    const meetup = new Meetup(req.body);

    meetup.save()
    .then(newMeetup => {
        debuglog('LOG', 'meetup controller - postMeetup', 'posted new meetup');
        res.status(201).json({result: 'success', message: 'post meetup success', _id: newMeetup['_id']});
    }).catch(err => {
        debuglog('ERROR', 'meetup controller - postMeetup', err);
        res.status(400).json(err);
    })
};

/* GET request for destination location coordinates

*/
function getMeetupLocation(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']);
    Meetup.findOne(req.params)
    .then(foundMeetup => {
        if (!foundMeetup){
            debuglog('ERROR', 'meetup controller - getMeetupLocation', 'meetup not found');
            res.status(404).json({result: 'error', message: 'Meetup not found'});
            return;
        }
        // debuglog('LOG', 'meetup controller - getMeetupLocation', 'found meetup');

        Location.findOne({'name': foundMeetup['locationName']})
        .then(foundLocation => {
            if (!foundLocation){
                debuglog('ERROR', 'meetup controller - getMeetupLocation', 'meetup location not found');
                res.status(404).json({result: 'error', message: 'meetup location not found'});
                return;
            } 
            // debuglog('LOG', 'meetup controller - getMeetupLocation', 'found meetup location');
            let results = {
                'name': foundLocation['name'],
                'coordinates': foundLocation['coordinates']
            }
            res.status(200).json(results);
        }).catch(err => { // catch errors
            debuglog('ERROR', 'meetup controller - getMeetupLocation', err);
            res.status(401).json(err);
            return;
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'meetup controller - getMeetupLocation', err);
        res.status(401).json(err);
        return;
    })
}

/* GET request for friends locations

*/
function getFriendsLocations(req, res) {
    const userNetID = req.params.userNetID;
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']);
    Meetup.findOne({'_id': req.params['_id']})
    .then(foundMeetup => {
        if (!foundMeetup) {
            debuglog('ERROR', 'meetup controller - getFriendsLocation', 'meetup not found');
            res.status(404).json({result: 'error', message: 'Meetup not found'});
            return;
        }

        // debuglog('LOG', 'meetup controller - getFriendsLocation', 'found meetup');

        const friends = foundMeetup['friends'];

        let netIDs = [];
        for (const i in friends){
            if (friends[i]['netID'] == userNetID){
                continue;
            }
            if (friends[i]['status'] == 'Accepted'){
                netIDs.push(friends[i]['netID']);
            }
        }
        
        User.find().where('netID').in(netIDs)
        .then(foundUsers => {
            if (!foundUsers){
                debuglog('ERROR', 'meetup controller - getFriendsLocation', 'users not found');
                res.status(404).json({result: 'error', message: 'Users not found'});
                return;
            }

            // debuglog('LOG', 'meetup controller - getFriendsLocation', 'found users');

            let results = [];
            for (const i in foundUsers){
                let foundUser = foundUsers[i];
                results.push({
                    'firstName': foundUser['firstName'],
                    'lastName': foundUser['lastName'],
                    'coordinates': foundUser['coordinates']
                })
            }

            res.status(200).json(results);
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'meetup controller - getFriendsLocation', err);
        res.status(401).json(err);
        return;
    })
}

/* PUT request for user status

*/
function updateUserStatus(req, res){
    const userNetID = req.body['netID'].toLowerCase();
    const meetupID = mongoose.Types.ObjectId(req.params['_id']);
    const status = req.body['status'];

    Meetup.findOne({'_id': meetupID})
    .then(foundMeetup => {
        if (!foundMeetup) {
            debuglog('ERROR', 'meetup controller - updateUserStatus', 'meetup not found');
            res.status(404).json({ result: 'error', message: 'Meetup not found' });
            return;
        }

        let friends = foundMeetup['friends'];
        
        for (const i in friends){
            if (friends[i]['netID'] == userNetID){
                friends[i]['status'] = status;
                break;
            }
        }

        Meetup.updateOne({ '_id': meetupID }, {"friends": friends})
        .then(dbResponse => {
            debuglog('LOG', 'meetup controller - updateUserStatus', 'updated user status')
            res.status(200).json({ result: 'success', message: 'meetup user status update successful' });
        }).catch(err => {
            debuglog('ERROR', 'meetup controller - updateUserStatus', err);
            res.status(500).json(err.message);
        })

    })

}

function meetupCleaner(req, res){
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let params = {
        'createdAt': {
            $lt: date
        }
    }
    Meetup.deleteMany()
    .then(dbResponse => {
        debuglog('LOG', 'meetup controller - meetupCleaner', `deleted ${dbResponse['n']} entries`);
        res.status(200).json({result: 'success', message: `meetup cleaned up ${dbResponse['n']} entires`});
    }).catch(err => {
        debuglog('ERROR', 'meetup controller - updateUserStatus', err);
        res.status(500).json(err.message);
    })
}

function getUsersAcceptedMeetups(req, res){
    const userNetID = req.params['userNetID'].toLowerCase();
    Meetup.find({ 'friends': {$elemMatch: {'netID': userNetID, 'status': 'Accepted'}}}).sort({createdAt: -1})
    .then(meetups => {
        debuglog('LOG', 'meetup controller - getUsersAcceptedMeetups', `got ${userNetID}'s accepted meetups`);
        res.status(200).json(meetups);
        // console.log(meetups);
    }).catch(err => {
        debuglog('ERROR', 'meetup controller - getUsersAcceptedMeetups', err);
        res.status(500).json(err.message);
    })
}

function getUsersPendingMeetups(req, res){
    const userNetID = req.params['userNetID'].toLowerCase();
    Meetup.find({ 'friends': {$elemMatch: {'netID': userNetID, 'status': 'Pending'}}}).sort({createdAt: -1})
    .then(meetups => {
        debuglog('LOG', 'meetup controller - getUsersPendingMeetups', `got ${userNetID}'s pending meetups`);
        res.status(200).json(meetups);
        // console.log(meetups);
    }).catch(err => {
        debuglog('ERROR', 'meetup controller - getUsersPendingMeetups', err);
        res.status(500).json(err.message);
    })
}