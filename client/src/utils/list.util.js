const server = 'http://107.191.49.209/api';

function getLocationsForType(type){
    return fetch(server + '/locations/' + type)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getLocations(){
    return fetch(server + '/locations')
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getReviewsForLocation(locationName){
    return fetch(server + '/review/location/' + locationName)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getReviews(){
    return fetch(server + '/review')
    .then(res => res.json())
    .then(json => {
        return json;
    });
}


export default {
    getLocationsForType,
    getLocations,
    getReviewsForLocation,
    getReviews
}