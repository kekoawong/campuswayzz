import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Divider, ToggleButton, Switch, TextInput} from 'react-native-paper';
import profileutil from '../utils/profile.util';

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


function MainProfile() {
  // User Information reloads after signing in or when user alters personal info
  const [userInfo, setUserInfo] = useState([]);
  const [editMode, swapMode] = useState(false);
  const [userFirstName, setFirstName] = useState(userInfo['firstName']);
  const [userLastName, setLastName] = useState(userInfo['lastName']);
  const [userNetId, setNetId] = useState(userInfo['netID']);
  const [userPrivacy, setPrivacy] = useState(userInfo['privacy']);



  useEffect(() => {
    profileutil.getUserData('kwong6')
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
        let updateUserData = {
          'firstName': userFirstName,
          'lastName': userLastName,
          'netID': userNetId,
          'privacy': userPrivacy
        };
        profileutil.putUserData(netID, updateUserData);
        swapMode(false);
    }
  }

  if(editMode){
    return (
      <View style={{flex:1}}> 
        <View style={styles.container_picture}> 
          <Avatar.Image size={100} source={require('./kwong.jpg')}/>
        </View> 
          <View style={styles.container_picture}>
            <Button icon='account-edit' mode='contained' onPress={editButton}>
              Save Changes
            </Button>
          </View>
        <View style={styles.container_info}>
          <TextInput mode='outlined' label='First Name' value={userInfo.firstName} onChangeText={setFirstName}/>
          <TextInput mode='outlined' label='Last Name' value={userInfo.lastName} onChangeText={setLastName}/>
          <TextInput mode='outlined' label='NetID' value={userInfo.netID} onChangeText={setNetId}/>
          <ToggleButton.Group onValueChange={setPrivacy} value={userPrivacy}>
            <ToggleButton icon='account-check' value='Share indefinitely'/>
            <ToggleButton icon='account-clock' value='Share while using'/>
            <ToggleButton icon='account-off' value='Never share'/>
          </ToggleButton.Group>
          <Text style={styles.rows}>Privacy: {userPrivacy}</Text>
        </View>
      </View>
      );
  }
  else{
    return (
      <View style={{flex:1}}> 
        <View style={styles.container_picture}> 
          <Avatar.Image size={100} source={require('./kwong.jpg')}/>
        </View> 
          <View style={styles.container_picture}>
            <Button icon='account-edit' mode='contained' onPress={editButton}>
              Edit Profile
            </Button>
          </View>
        <View style={styles.container_info}>
          <Text style={styles.rows}>First Name: {userFirstName}</Text>
          <Divider />
          <Text style={styles.rows}>Last Name: {userLastName}</Text>
          <Divider />
          <Text style={styles.rows}>NetID: {userNetId}</Text>
          <Divider />
          <Text style={styles.rows}>Privacy: {userPrivacy}</Text>
          <Divider />
        </View>
        <View style={styles.container_switch}>
          <GhostSwitch/>
        </View>
      </View>
      );
  }
}

export default function ProfileScreen() {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator>
          <Stack.Screen name="Profile" component={MainProfile} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    container_info: { // User info
      flex: 3,
      backgroundColor: 'white'
    },
    container_picture: { // Profile Picture
      flex: 1,
      backgroundColor: 'gold',
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
    }
});