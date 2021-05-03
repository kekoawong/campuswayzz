const server = 'http://107.191.49.209/api';

function getUserLocation(netID){
    return fetch(server + '/user/location/' + netID)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function putUserLocation(netID, coordinates){
    return fetch(server + '/user/location/' + netID, {
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