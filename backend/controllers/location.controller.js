/* location controller file */
const Location = require('../models/location.model');
const debuglog = require('../debuglog');

module.exports = {
    postLocation,
    getAllLocations,
    getLocationsForType,
    getAllLocationNames,
    putLocationInfo
}

/* POST request for location
Post a new location

- req endpoint: '/api/location'
- req body: {"name": "___", "type": "___", etc.}

- res body: {result: 'success', message: 'post location success'}

*/
function postLocation(req, res){
    const location = new Location(req.body);
    location.save()
    .then(newLocation => {
        debuglog('LOG', 'location controller - postLocation', 'posted location');
        res.status(201).json({result: 'success', message: 'post location success'});
    }).catch(err => {
        debuglog('ERROR', 'location controller - postLocation', err);
        res.status(400).json(err);
    })
};

/* GET request for ALL locations
Search for all locations in database (no filter)

- req endpoint: '/api/locations
- req body: n/a

- res body: [ {location1obj}, {location2obj}, etc. ]

*/
function getAllLocations(req, res){
    Location.find()
    .then(allLocations => {
        if (!allLocations){
            res.status(404).json({result: 'error', message: 'Locations not found'});
            return;
        }
        debuglog('LOG', 'location controller - getAllLocations', 'got all locations');
        res.status(200).json(allLocations);
    }).catch(err => { // catch errors
        debuglog('ERROR', 'location controller - getAllLocations', err);
        res.status(401).json(err);
        return;
    })
}

/* GET request for locations by type
Search for all locations for a given type

- req endpoint: '/api/locations/:type'
- req body: n/a

- res body: [ {location1obj}, {location2obj}, etc. ]

*/
function getLocationsForType(req, res){
    Location.find(req.params) // req.params: {"type": "___"}
    .then(locations => {
        debuglog('LOG', 'location controller - getLocationsForType', 'got locations for ' + req.params["type"]);
        res.status(200).json(locations);
    }).catch(err => { // catch errors
        debuglog('ERROR', 'location controller - getLocationsForType', err);
        res.status(401).json(err);
        return;
    })
}

function getAllLocationNames(req, res){
    Location.find().sort({name: 1})
    .then(locations => {
        let locationNames = [];
        for (const i in locations){
            locationNames.push({'name': locations[i]['name']});
        }
        debuglog('LOG', 'location controller - getAllLocationNames', 'got all locations names');
        res.status(201).json(locationNames);
    }).catch(err => { // catch errors
        debuglog('ERROR', 'location controller - getAllLocationNames', err);
        res.status(401).json(err);
        return;
    })
}

function putLocationInfo(req, res){
    Location.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        if (dbResponse['n'] == 1) {
            debuglog('LOG', 'location controller - putLocationInfo', 'updated location info');
            res.status(200).json({ result: 'success', message: 'Location update successful' });
        } else if (dbResponse['n'] == 0) {
            debuglog('LOG', 'location controller - putLocationInfo', 'location not found');
            res.status(200).json({ result: 'error', message: 'Location not found' });
        }
    })
}