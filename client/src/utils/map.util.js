const https = require('https');

function getLocationsForType(type){
    return fetch('http://localhost:5000/api/locations/' + type)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

export default {
    getLocationsForType
}