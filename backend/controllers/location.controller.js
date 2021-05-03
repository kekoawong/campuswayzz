/* location controller file */
const Location = require('../models/location.model');

module.exports = {
    postLocation,
    getLocations,
    getLocationsForType,
    getLocationNames
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
        console.log('new location created');
        res.status(201).json({result: 'success', message: 'post location success'});
    }).catch(err => {
        console.log('error with post location');
        console.log(err);
        res.status(400).json(err);
    })
};

/* GET request for ALL locations
Search for all locations in database (no filter)

- req endpoint: '/api/locations
- req body: n/a

- res body: [ {location1obj}, {location2obj}, etc. ]

*/
function getLocations(req, res){
    console.log("backend: request received for get locations");
    Location.find()
    .then(allLocations => {
        if (!allLocations){
            res.status(404).json({result: 'error', message: 'Locations not found'});
            return;
        }
        res.status(200).json(allLocations);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
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
        res.status(200).json(locations);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}

function getLocationNames(req, res){
    Location.find()
    .then(locations => {
        let locationNames = [];
        for (const i in locations){
            locationNames.push(locations[i]['name']);
        }
        res.status(201).json(locationNames);
    }).catch(err => { // catch errors
        console.log('weird error');
        console.log(err);
        res.status(401).json(err);
        return;
    })
}