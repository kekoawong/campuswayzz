/* location controller file */
const Location = require('../models/location.model');

module.exports = {
    postLocation,
    getLocationsForType
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