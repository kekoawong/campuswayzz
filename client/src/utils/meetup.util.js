const server = 'http://107.191.49.209/api';

function postMeetup(meetupData){
    console.log(meetupData);
    return fetch(server + '/meetup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(meetupData)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Posting new meetup failed');
    })
}

function getMeetupLocation(meetupID){
    return fetch(server + '/meetup/' + meetupID + '/location')
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function getFriendsLocation(meetupID, userNetID){
    return fetch(server + '/meetup/' + meetupID + '/friends/' + userNetID)
    .then(res => res.json())
    .then(json => {
        return json;
    })
}

function updateUserStatus(userNetID, status){
    const data = {'netID': userNetID, 'status': status};
    return fetch(server + '/meetup/' + meetupID + '/userstatus', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Posting new meetup failed');
    })
}

export default {
    postMeetup,
    getMeetupLocation,
    getFriendsLocation,
    updateUserStatus
}