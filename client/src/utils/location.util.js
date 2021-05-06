const server = 'http://107.191.49.209/api';

/* make API call to server to get locations for a given type */
function getLocationsForType(type){
    return fetch(server + '/locations/' + type)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

/* make API call to server to get locations for ALL locations */
function getLocations(){
    console.log("fetch all locations");
    return fetch(server + '/locations')
    //return fetch('http://www.example.com/index.html')
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getAllLocationNames(){
    return fetch(server + '/location/names/all')
    .then(res => res.json())
    .then(json => {
        return json;
    })
}

export default {
    getLocationsForType,
    getLocations,
    getAllLocationNames
}