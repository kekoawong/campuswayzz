function getLocationsForType(type){
    return fetch('http://db.cse.nd.edu:5002/api/locations/' + type)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getLocations(){
    return fetch('http://db.cse.nd.edu:5002/api/locations')
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getReviewsForLocation(locationName){
    return fetch('http://db.cse.nd.edu:5002/api/review/location/' + locationName)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getReviews(){
    return fetch('http://db.cse.nd.edu:5002/api/review')
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