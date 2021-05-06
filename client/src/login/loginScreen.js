import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import userutil from '../utils/user.util';

function login(props) {
    const [user, setUser] = useState({
        netID: '',
        password: ''
    }); 

    // const navigation = useNavigation();

    async function login() {
        try {
            await userutil.login(user);
        } catch (err) {
            console.log('Login Screen: invalid credentials');
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        login().then(() => {
            props.onLoggedIn();
            console.log('Login Screen: login complete');
        })
    }

    return (
        <View>
            <TextInput mode='outlined' label='NetID' placeholder={'NetID'} value={user.netID} onChangeText={value => setUser(prev => {return {...prev, 'netID': value}})}/>
            <TextInput mode='outlined' label='Password' placeholder={'Password'} value={user.password} onChangeText={value => setUser(prev => {return {...prev, 'password': value}})}/>
            <Button icon='check-outline' mode='contained' onPress={handleSubmit}>
                Login
            </Button>
        </View>
    );
}

export default login;