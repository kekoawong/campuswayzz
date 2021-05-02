import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Divider, Switch} from 'react-native-paper';
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

  useEffect(() => {
    profileutil.getUserData('kwong6')
    .then(res => {
      setUserInfo(res)
      return
    })
  }, [])

  return (
    <View style={{flex:1}}> 
      <View style={styles.container_picture}> 
        <Avatar.Image size={100} source={require('./kwong.jpg')}/>
      </View> 
      <View style={styles.container_picture}>
        <Button icon='account-edit' mode='contained' onPress={() => console.log('Pressed')}>
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
        <Text style={styles.rows}>Privacy: {userInfo.privacy}</Text>
        <Divider />
      </View>
      <View style={styles.container_switch}>
        <GhostSwitch/>
      </View>
    </View>
    );
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
      flex: 2,
      backgroundColor: 'navy'
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