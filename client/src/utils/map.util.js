// const http = require('http');

/* make API call to server to get locations for a given type */
function getLocationsForType(type){
    return fetch('http://db.cse.nd.edu:5002/api/locations/' + type)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

/* make API call to server to get locations for ALL locations */
function getLocations(){
    return fetch('http://db.cse.nd.edu:5002/api/locations')
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

export default {
    getLocationsForType,
    getLocations
}