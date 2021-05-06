import React, { useState, useEffect } from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import ListScreen from './src/list/listScreen';
import MapScreen from './src/map/mapScreen';
import ProfileScreen from './src/profile/profileScreen';
import { linkingConfig } from './src/linking/deepLinking';
import * as Linking from 'expo-linking';
import Login from './src/login/loginScreen';
import Signup from './src/login/signupScreen';
import userutil from './src/utils/user.util';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default function App() {
  // userutil.logout();
  // event listener for deep linking
  Linking.addEventListener('url', (item) => {
    console.log(item.url);
    const thing = Linking.parse(item.url);
    console.log(thing);
  });

  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function getUser(){
    const res = await userutil.getUser();
    console.log('App.js::getUser()::getting token');
    console.log(res);
    console.log('--------')
    if (res) {
      setLoggedIn(true);
      setUser(res);
    }
    return res;
  }

  function handleLogin(){
    console.log('App.js :: handleLogin');
    getUser();
  }

  function handleLogout(){
    console.log('App.js :: handleLogout');
    setLoggedIn(false);
  }

  useEffect(() => {
    console.log('USE EFFECT');
    getUser();
  }, [isLoggedIn]);

  return (
    <SafeAreaProvider>
      {!isLoggedIn ? 
        <Login onLoggedIn={handleLogin} /> :
        <NavigationContainer linking={linkingConfig}>
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
                initialParams={{user: user}}
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
                initialParams={{user: user}}
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
        </NavigationContainer>
      }
    </SafeAreaProvider>
  )
  
}


