import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Avatar, Button, Divider, ToggleButton, Switch, TextInput} from 'react-native-paper';
import userutil from '../utils/user.util';
const logo = require('../../assets/CW_logo.jpg')

// Ghost mode switch
const GhostSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  if(isSwitchOn){ //Check switch state to change text to On or Off
    return <View style={styles.container_switch}>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/>
              <View style={styles.rows}>
                <Text>Ghost Mode: On</Text>
              </View>
           </View>;
  }
  else{
    return <View style={styles.container_switch}>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/>
              <View style={styles.rows}>
                <Text>Ghost Mode: Off</Text>
              </View>
           </View>;
  }
};


function MainProfile({route}) {
  // User Information reloads after signing in or when user alters personal info
  const [userInfo, setUserInfo] = useState([]);
  const [editMode, swapMode] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(140);

  useEffect(() => {
    userutil.getUserData(route.params.user.netID)
    .then(res => {
      setUserInfo(res)
      return
    })
  }, []) 

  function editButton(event){
    event.preventDefault();
    
    if (editMode === false){ 
        // on "edit" option ==> view only state
        console.log('Switching to editor');
        swapMode(true);
    } else {
        // on "update" option ==> edit state
        console.log('Saving changes');
        userutil.putUserData(userInfo.netID, userInfo);
        swapMode(false);
    }
  }

  function handleLogout(){
    userutil.logout();
  }

  if(editMode){
    return (
      <View style={{flex:1}}> 
        <View style={styles.container_picture}> 
          <Avatar.Image size={100} source={logo}/>
        </View> 
          <View style={styles.container_picture}>
            <Button icon='account-edit' mode='contained' color={'gold'} onPress={editButton}>
              Save Changes
            </Button>
          </View>
        <View style={styles.container_info}>
            <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={"position"} keyboardVerticalOffset={keyboardOffset}>
              <TextInput mode='flat' label='First Name' value={userInfo.firstName} selectionColor={'gold'} underlineColor={'gold'}
              onContentSizeChange={() => setKeyboardOffset(keyboardOffset+1)} 
              onChangeText={val => setUserInfo({...userInfo, 'firstName': val})}/>
              <TextInput mode='flat' label='Last Name' value={userInfo.lastName} selectionColor={'gold'} underlineColor={'gold'}
              onContentSizeChange={() => setKeyboardOffset(keyboardOffset+1)} 
              onChangeText={val => setUserInfo({...userInfo, 'lastName': val})}/>
              <TextInput mode='flat' label='NetID' value={userInfo.netID} selectionColor={'gold'} underlineColor={'gold'}
              onContentSizeChange={() => setKeyboardOffset(keyboardOffset+1)} onChangeText={val => setUserInfo({...userInfo, 'netID': val})}/>
            </KeyboardAvoidingView>
        </View>
      </View>
      );
  }
  else{
    return (
      <View style={{flex:1}}> 
        <View style={styles.container_picture}> 
          <Avatar.Image size={100} source={logo}/>
        </View> 
          <View style={styles.container_picture}>
            <Button icon='account-edit' mode='contained' color={'gold'} onPress={editButton}>
              Edit Profile
            </Button>
          </View>
        <View style={styles.container_info}>
          <Text style={styles.rows}>First Name: {userInfo.firstName}</Text>
          <Divider />
          <Text style={styles.rows}>Last Name: {userInfo.lastName}</Text>
          <Divider />
          <Text style={styles.rows}>NetID: {userInfo.netID}</Text>
          <Divider />
          <Text style={styles.rows}>Privacy Statement: CampusWayzz uses your location in order to direct you to your destination. 
            Your location will only be shown to other users when you create or join a meetup.</Text>
        </View>
        <View style={styles.container_logout}>
            <Button icon='' mode='contained' color={'gold'} onPress={handleLogout}>
              Logout
            </Button>
          </View>
      </View>
      );
  }
}

export default function ProfileScreen({route}) {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator>
          <Stack.Screen name="Profile" component={MainProfile} initialParams={{user: route.params.user}} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    container_info: { // User info
      flex: 3,
      backgroundColor: 'navy'
    },
    container_picture: { // Profile Picture
      flex: 1,
      backgroundColor: 'navy',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container_logout: { // Profile Picture
      flex: .5,
      backgroundColor: 'navy',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container_switch: { // Ghost switch
      flex: 1,
      backgroundColor: 'mediumspringgreen',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rows: { // User info alignment
      color: 'gold',
      padding: 13.75,
      fontSize: 20
    },
    keyboardAvoid: { // Avoid keyboard for editing
      flex: 1
    }
});