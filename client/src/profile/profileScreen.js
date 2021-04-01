import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Divider, Switch} from 'react-native-paper';

const GhostSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  if(isSwitchOn){
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
  return (
    <View style={{flex:1}}>
      <View style={styles.container_picture}>
        <Avatar.Image size={100}/>
      </View> 
      <View style={styles.container_picture}>
        <Button icon='camera' mode='contained'>
          <Text>Choose Photo</Text>
        </Button>
      </View>
      <View style={styles.container_info}>
        <Text style={styles.rows}>First Name:</Text>
        <Divider />
        <Text style={styles.rows}>Last Name:</Text>
        <Divider />
        <Text style={styles.rows}>NetID:</Text>
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
    container_info: {
      flex: 2,
      backgroundColor: 'white'
    },
    container_picture: {
      flex: 1,
      backgroundColor: 'powderblue',
      justifyContent: 'center',
      alignItems: 'center'
    },
    container_switch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rows: {
      padding: 13.75,
      fontSize: 20
    }
});