/* make API call to server to get user data based on user netID */
function getUserData(netID){
    return fetch('http://107.191.49.209/api/user/' + netID)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

function putUserData(netID, data){
    return fetch('http://107.191.49.209/api/user/' + netID, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('User not able to update');
    })
}

export default {
    getUserData,
    putUserData
}