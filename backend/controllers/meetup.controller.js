/* meetup controller file */
const mongoose = require('mongoose');
const Meetup = require('../models/meetup.model');
const Location = require('../models/location.model');
const User = require('../models/user.model');
const reviewModel = require('../models/review.model');

module.exports = {
    postMeetup,
    getMeetupLocationDestination,
    getFriendsLocations
}

/* POST request for meetup

*/
function postMeetup(req, res){
    const meetup = new Meetup(req.body);

    meetup.save()
    .then(newMeetup => {
        console.log('new meetup created');
        res.status(201).json({result: 'success', message: 'post meetup success'})
    }).catch(err => {
        console.log('error with post location');
        console.log(err);
        res.status(400).json(err);
    })
};

/* GET request for destination location coordinates

*/
function getMeetupLocationDestination(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']);
    Meetup.findOne(req.params)
    .then(foundMeetup => {
        if (!foundMeetup){
            res.status(404).json({result: 'error', message: 'Meetup not found'});
            return;
        }
        console.log('found meetup');
        console.log(foundMeetup);

        Location.findOne({'name': foundMeetup['locationName']})
        .then(foundLocation => {
            if (!foundLocation){
                res.status(404).json({result: 'error', message: 'Location not found'});
                return;
            }
            console.log('found location');
            console.log(foundLocation);
            let results = {
                'name': foundLocation['name'],
                'coordinates': foundLocation['coordinates']
            }
            res.status(200).json(results);
        }).catch(err => { // catch errors
            console.log('weird error');
            console.log(err);
            res.status(401).json(err);
            return;
        })
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

/* GET request for friends locations

*/
function getFriendsLocations(req, res){
    req.params['_id'] = mongoose.Types.ObjectId(req.params['_id']);
    Meetup.findOne(req.params)
    .then(foundMeetup => {
        if (!foundMeetup){
            res.status(404).json({result: 'error', message: 'Meetup not found'});
            return;
        }
        console.log('found meetup');
        console.log(foundMeetup);

        const friends = foundMeetup['friends'];

        let netIDs = [];
        for (const i in friends){
            if (friends[i]['status'] == 'Accepted'){
                netIDs.push(friends[i]['netID']);
            }
        }
        console.log(netIDs);
        
        User.find().where('netID').in(netIDs)
        .then(foundUsers => {
            if (!foundUsers){
                res.status(404).json({result: 'error', message: 'Users not found'});
                return;
            }
            console.log('found users');
            console.log(foundUsers);

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
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

/* PUT request for user status

*/
function userUpdateStatus(req, res){

}