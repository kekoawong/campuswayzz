/* make API call to server to get user data based on user netID */

const server = 'http://107.191.49.209/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';

function login(credentials){
    console.log(credentials);
    return fetch(server + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    .then(res => {
        console.log('userutil :: login :: logging in');
        if (res.ok) return res.json();
        throw new Error('Bad credentials!');
    })
    .then(({token}) => {
        createToken(token);
    });
}

function signup(credentials) {
    console.log(credentials);
    return fetch(server + '/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })
    .then(res => {
        console.log('userutiL :: signup :: signing up');
        if (res.ok) return res.json();
        throw new Error('NetID has already been taken');
    })
    .then(({token}) => {
        createToken(token);
    })
}

function getUser(){
    return getToken()
    .then(token => {
        console.log('userutil :: getUser :: got raw token :: ' + token)
        try {
            const user = JSON.parse(Base64.atob(token.split('.')[1]))['user'];
            console.log(`userutil :: getUser :: got token for ${user['netID']}`);
            return user;
        } catch (e) {
            return null;
        }
    })
    .then(res => {
        return res;
    })
}

function logout(){
    console.log('userutil :: logout :: logging out');
    removeToken();
}

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
    login,
    signup,
    logout,
    getUser,
    logout,
    getUserData,
    putUserData,
    getUserLocation,
    putUserLocation,
    getAllUserNetIDs
}

function createToken(token){
    console.log('userutil :: createToken :: creating token ' + token);
    if (token) {
        console.log('userutil :: createToken :: attempting');
        AsyncStorage.setItem('token', token)
        .then(() => {
            AsyncStorage.getItem('token')
            .then((result) => {
                console.log('userutil :: createToken :: successfully created token ' + result);
            })
        })
    } else {
        console.log('userutil :: createToken :: no token passed');
        AsyncStorage.removeItem('token');
    }
}

async function getToken(){
    console.log('userutil :: getToken :: start')
    try {
        const tok = await AsyncStorage.getItem('token');
        console.log('userutil :: getToken :: got following token - ' + tok);
        return tok;
    } catch(e) {
        // error reading value
    }
    
}

function removeToken(){
    AsyncStorage.removeItem('token');
    console.log('removed token');
}