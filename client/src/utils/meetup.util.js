function getUserLocation(netID){
    return fetch('http://db.cse.nd.edu:5002/api/user/location/' + netID)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function putUserLocation(netID, coordinates){
    return fetch('http://db.cse.nd.edu:5002/api/user/location/' + netID, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(coordinates)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User location not able to update');
    })
}

export default {
    getUserLocation,
    putUserLocation
}