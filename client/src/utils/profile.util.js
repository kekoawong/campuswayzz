/* make API call to server to get user data based on user netID */
function getUserData(netID){
    return fetch('http://db.cse.nd.edu:5002/api/user/' + netID)
    .then(res => res.json())
    .then(json => {
        return json;
    });
}

export default {
    getUserData
}