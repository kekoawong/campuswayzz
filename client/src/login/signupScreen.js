import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import userutil from '../utils/user.util';

function signup() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        netID: '',
        password: '',
        privacy: 'Share indefinitely'
    });

    async function handleSubmit(event){
        event.preventDefault();
        console.log(user);
        try {
            await userutil.signup(user);
        } catch (err) {
            console.log('Invalid Credentials');
        }
    }
    

    return (
        <View>
            <TextInput mode='outlined' label='First Name' placeholder={'First Name'} value={user.firstName} onChangeText={value => setUser(prev => {return {...prev, 'firstName': value}})}/>
            <TextInput mode='outlined' label='Last Name' placeholder={'Last Name'} value={user.lastName} onChangeText={value => setUser(prev => {return {...prev, 'lastName': value}})}/>
            <TextInput mode='outlined' label='NetID' placeholder={'NetID'} value={user.netID} onChangeText={value => setUser(prev => {return {...prev, 'netID': value}})}/>
            <TextInput mode='outlined' label='Password' placeholder={'Password'} value={user.password} onChangeText={value => setUser(prev => {return {...prev, 'password': value}})}/>
            <Button icon='clipboard-check-outline' mode='contained' onPress={handleSubmit}>
                Signup
            </Button>
        </View>
    );
}

export default signup;