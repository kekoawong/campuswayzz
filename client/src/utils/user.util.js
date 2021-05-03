/* make API call to server to get user data based on user netID */

const server = 'http://107.191.49.209/api';

function getUserData(netID){
    return fetch(server + '/user/' + netID)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function putUserData(netID, data){
    return fetch(server + '/user/' + netID, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not able to update');
    })
}

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

function getAllUserNetIDs(){
    return fetch(server + '/user/netIDs/all')
    .then(res => res.json())
    .then(json => {
        return json;
    })
}

export default {
    getUserData,
    putUserData,
    getUserLocation,
    putUserLocation,
    getAllUserNetIDs
}