import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Avatar, Button, TextInput, Snackbar} from 'react-native-paper';
import userutil from '../utils/user.util';
import { color } from 'jimp';
const logo = require('../../assets/CW_logo.jpg');

function login(props) {
    const [userFlowView, setUserFlowView] = useState('login');
    const [userLoginInfo, setUserLoginInfo] = useState({
        netID: '',
        password: ''
    }); 
    const [keyboardLoginOffset, setKeyboardLoginOffset] = useState(290);
    const [keyboardSignupOffset, setKeyboardSignupOffset] = useState(220);

    const [visible, setVisible] = useState(false);

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
            console.log('Login Screen: Invalid Credentials');
            setVisible(true);
        }
    }

    async function signup(){
        try {
            await userutil.signup(userSignupInfo);
        } catch (err) {
            console.log('Signup Screen: Invalid Credentials');
            setVisible(true);
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
                            <TextInput style={styles.input} mode='flat' autoComplete="off" label='NetID' placeholder={'NetID'} selectionColor={'gold'} underlineColor={'gold'} value={userLoginInfo.netID} onChangeText={value => setUserLoginInfo(prev => {return {...prev, 'netID': value}})}/>
                            <TextInput style={styles.input} mode='flat' secureTextEntry={true} autoComplete="off" label='Password' placeholder={'Password'} selectionColor={'gold'} underlineColor={'gold'} value={userLoginInfo.password} onChangeText={value => setUserLoginInfo(prev => {return {...prev, 'password': value}})}/>
                            <Button style={styles.input} icon='check-outline' mode='contained' color={'gold'}onPress={handleLoginButton}>
                                Login
                            </Button>
                            <Text style={styles.signupText} style={{color: 'gold'}} onPress={switchToSignup}>
                                Don't have an account? Sign up here.
                            </Text>
                            <Snackbar
                                visible={visible}
                                onDismiss={() => setVisible(false)}
                                action={{
                                    label: 'Dismiss',
                                    onPress: () => {
                                    setVisible(false);
                                    },
                                }}>
                                Username or Password is incorrect. Please try again. 
                            </Snackbar>
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
                            <TextInput style={styles.input} mode='flat' autoComplete="off" secureTextEntry={false} label='First Name' placeholder={'First Name'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.firstName} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'firstName': value}})}/>
                            <TextInput style={styles.input} mode='flat' autoComplete="off" secureTextEntry={false} label='Last Name' placeholder={'Last Name'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.lastName} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'lastName': value}})}/>
                            <TextInput style={styles.input} mode='flat' autoComplete="off" secureTextEntry={false} label='NetID' placeholder={'NetID'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.netID} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'netID': value}})}/>
                            <TextInput style={styles.input} mode='flat' autoComplete="off" secureTextEntry={true} label='Password' placeholder={'Password'} selectionColor={'gold'} underlineColor={'gold'} value={userSignupInfo.password} onChangeText={value => setUserSignupInfo(prev => {return {...prev, 'password': value}})}/>
                        </KeyboardAvoidingView>
                        <Button style={styles.input} icon='clipboard-check-outline' color={'gold'} mode='contained' onPress={handleSignupButton}>
                            Signup
                        </Button>
                        <Text style={styles.signupText} onPress={switchToLogin}>
                            Already have an account? Login here.
                        </Text>
                        <Snackbar
                                visible={visible}
                                onDismiss={() => setVisible(false)}
                                action={{
                                    label: 'Dismiss',
                                    onPress: () => {
                                    setVisible(false);
                                    },
                                }}>
                                Username is already taken. Please try another username. 
                            </Snackbar>
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
    input: {
        marginHorizontal: 10,
        marginBottom: 10
    },
    signupText: {
        marginHorizontal: 10,
        marginBottom: 10,
        color: 'gold'
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
        justifyContent: 'center'
    },
    container_login: {
        flex: 2,
        backgroundColor: 'navy',
        overflow: 'scroll',
        justifyContent: 'center'
    },
});