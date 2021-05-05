import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import ListScreen from './src/list/listScreen';
import MapScreen from './src/map/mapScreen';
import ProfileScreen from './src/profile/profileScreen';
import * as Linking from 'expo-linking';
import Login from './src/login/loginScreen';
import Signup from './src/login/signupScreen';
import userutil from './src/utils/user.util';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default function App() {

  // event listener for deep linking
  Linking.addEventListener('url', (item) => {
    console.log(item.url);
    //const [path, queryParams] = Linking.parse(item.url);
    //console.log(path);
    //console.log(queryParams)
  });

  const initialURL = Linking.getInitialURL();
  console.log(initialURL);

  const linking = {
    prefixes: ['https://campuswayzz.com', 'campuswayzz://', 'exp://'],
    screens: {
      List: 'list',
      Map: 'map',
      Profile: 'profile',
      NotFound: '*',
    },
  };

  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function getUser(){
    console.log('async lookie');
    console.log(await userutil.getUser());
    console.log('####')
    return await userutil.getUser();
  }

  useEffect(() => {
    console.log('APP.JS: 1 GETTING USER IN USEEFFECT');
    console.log(user);
    console.log('----')
    getUser().then(response => {
      console.log('APP.JS: 2 GETTING USER IN USEEFFECT');
      console.log(response);
      console.log('@@@@@');
      setLoggedIn(true);
      setUser(response);
    })
  }, [isLoggedIn]);

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        {!isLoggedIn ? 
          <Login /> :
          <Tab.Navigator>
            <Tab.Screen 
                name="List" 
                component={ListScreen}
                options={{
                  tabBarLabel: 'List',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="list-alt" color={color} size={size} />
                  ),
                }}
            />
            <Tab.Screen 
                name="Map" 
                component={MapScreen} 
                options={{
                  tabBarLabel: 'Map',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="map" color={color} size={size} />
                  ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person" color={color} size={size} />
                  ),
                }}
                initialParams={{user: user}}
            />
          </Tab.Navigator>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  )

  /*if (user){
    return (
        <SafeAreaProvider>
          <NavigationContainer linking={linking}>
            <Tab.Navigator>
              <Tab.Screen 
                  name="List" 
                  component={ListScreen}
                  options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="list-alt" color={color} size={size} />
                    ),
                  }}
              />
              <Tab.Screen 
                  name="Map" 
                  component={MapScreen} 
                  options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="map" color={color} size={size} />
                    ),
                  }}
              />
              <Tab.Screen 
                  name="Profile" 
                  component={ProfileScreen} 
                  options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="person" color={color} size={size} />
                    ),
                  }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      );
  } else {
    return (
      <Login />
    );
  }*/

  
}


