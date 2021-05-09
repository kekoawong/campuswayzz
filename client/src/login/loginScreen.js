import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Avatar, Button, TextInput} from 'react-native-paper';
import userutil from '../utils/user.util';
const logo = require('../../assets/CW_logo.jpg');

function login(props) {
    const [userFlowView, setUserFlowView] = useState('login');
    const [userLoginInfo, setUserLoginInfo] = useState({
        netID: '',
        password: ''
    }); 
    const [keyboardLoginOffset, setKeyboardLoginOffset] = useState(290);
    const [keyboardSignupOffset, setKeyboardSignupOffset] = useState(220);


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
                        <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={"position"} keyboardVerticalOffset={keyboardLoginOffset}>
                            <TextInput mode='flat' autoComplete="off" label='NetID' placeholder={'NetID'} selectionColor={'gold'} underlineColor={'gold'} value={userLoginInfo.netID} onChangeText={value => setUserLoginInfo(prev => {return {...prev, 'netID': value}})}/>
                            <TextInput mode='flat' secureTextEntry={true} autoComplete="off" label='Password' placeholder={'Password'} selectionColor={'gold'} underlineColor={'gold'} value={userLoginInfo.password} onChangeText={value => setUserLoginInfo(prev => {return {...prev, 'password': value}})}/>
                            <Button icon='check-outline' mode='contained' color={'gold'}onPress={handleLoginButton}>
                                Login
                            </Button>
                            <Text style={{color: 'gold'}} onPress={switchToSignup}>
                                Don't have an account? Sign up here.
                            </Text>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            :
                <View style={{flex:1}}>
                    <View style={styles.container_logo}> 
                        <Avatar.Image size={100} source={logo}/>
                    </View> 
                    <View style={styles.container_signup}>
                        <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={"position"} keyboardVerticalOffset={keyboardSignupOffset}>
                            <TextInput mode='flat' autoComplete="off" label='First Name' placeholder={'First Name'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.firstName} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'firstName': value}})}/>
                            <TextInput mode='flat' autoComplete="off" label='Last Name' placeholder={'Last Name'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.lastName} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'lastName': value}})}/>
                            <TextInput mode='flat' autoComplete="off" label='NetID' placeholder={'NetID'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.netID} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'netID': value}})}/>
                            <TextInput mode='flat' autoComplete="off" secureTextEntry={true} label='Password' placeholder={'Password'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.password} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'password': value}})}/>
                        </KeyboardAvoidingView>
                        <Button icon='clipboard-check-outline' color={'gold'} mode='contained' onPress={handleSignupButton}>
                            Signup
                        </Button>
                        <Text style={{color: 'gold'}} onPress={switchToLogin}>
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
        flex: .75,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_signup: {
        flex: 2,
        backgroundColor: 'navy',
        overflow: 'scroll',
        justifyContent: 'center',
    },
    container_login: {
        flex: 2,
        backgroundColor: 'navy',
        overflow: 'scroll',
        justifyContent: 'center',
    },
});