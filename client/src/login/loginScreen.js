import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, TextInput} from 'react-native-paper';
import userutil from '../utils/user.util';
const logo = require('../../assets/CW_logo.jpg');

function login(props) {
    const [userFlowView, setUserFlowView] = useState('login');
    const [userLoginInfo, setUserLoginInfo] = useState({
        netID: '',
        password: ''
    }); 

    const [userSignupInfo, setUserSignupInfo] = useState({
        firstName: '',
        lastName: '',
        netID: '',
        password: '',
        privacy: 'Share indefinitely'
    });

    async function login() {
        try {
            await userutil.login(userLoginInfo);
        } catch (err) {
            console.log('Login Screen: invalid credentials');
        }
    }

    async function signup(){
        try {
            await userutil.signup(userSignupInfo);
        } catch (err) {
            console.log('Signup Screen: invalid Credentials');
        }
    }

    function handleLoginButton(event){
        event.preventDefault();
        login().then(() => {
            props.onLoggedIn();
            console.log('Login Screen: login complete');
        })
    }

    function handleSignupButton(event){
        event.preventDefault();
        signup().then(() => {
            props.onLoggedIn();
            console.log('Signup Screen: signup complete');
        })
    }

    function switchToSignup() {
        setUserFlowView('signup');
    }

    function switchToLogin() {
        setUserFlowView('login');
    }

    return (
        <View style={{flex:1}}>
            {userFlowView == 'login' ?
                <View style={{flex:1}}>
                    <View style={styles.container_logo}> 
                        <Avatar.Image size={100} source={logo}/>
                    </View> 
                    <View style={styles.container_login}>
                        <TextInput mode='outlined' autoComplete="off" label='NetID' placeholder={'NetID'} value={userLoginInfo.netID} onChangeText={value => setUserLoginInfo(prev => {return {...prev, 'netID': value}})}/>
                        <TextInput mode='outlined' secureTextEntry={true} autoComplete="off" label='Password' placeholder={'Password'} value={userLoginInfo.password} onChangeText={value => setUserLoginInfo(prev => {return {...prev, 'password': value}})}/>
                        <Button icon='check-outline' mode='contained' onPress={handleLoginButton}>
                            Login
                        </Button>
                        <Text style={{color: 'blue'}} onPress={switchToSignup}>
                            Don't have an account? Sign up here.
                        </Text>
                    </View>
                </View>
            :
                <View style={{flex:1}}>
                    <View style={styles.container_logo}> 
                        <Avatar.Image size={100} source={logo}/>
                    </View> 
                    <View style={styles.container_signup}>
                        <TextInput mode='outlined' autoComplete="off" label='First Name' placeholder={'First Name'} value={userSignupInfo.firstName} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'firstName': value}})}/>
                        <TextInput mode='outlined' autoComplete="off" label='Last Name' placeholder={'Last Name'} value={userSignupInfo.lastName} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'lastName': value}})}/>
                        <TextInput mode='outlined' autoComplete="off" label='NetID' placeholder={'NetID'} value={userSignupInfo.netID} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'netID': value}})}/>
                        <TextInput mode='outlined' autoComplete="off" secureTextEntry={true} label='Password' placeholder={'Password'} value={userSignupInfo.password} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'password': value}})}/>
                        <Button icon='clipboard-check-outline' mode='contained' onPress={handleSignupButton}>
                            Signup
                        </Button>
                        <Text style={{color: 'blue'}} onPress={switchToLogin}>
                            Already have an account? Login here.
                        </Text>
                    </View>
                </View>
            }
        </View>
    );
}

export default login;

const styles = StyleSheet.create({
    container: {
        overflow: 'scroll',
        justifyContent: 'center'
    },
    container_logo: {
        flex: 1,
        backgroundColor: 'navy',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_signup: {
        flex: 2,
        overflow: 'scroll',
        justifyContent: 'center',
    },
    container_login: {
        flex: 2,
        overflow: 'scroll',
        justifyContent: 'center',
    },
    container_button: {
        flex: 1,
        justifyContent: 'center',
    }
});