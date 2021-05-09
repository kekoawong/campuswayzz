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
import userutil from './src/utils/user.util';

export default function App() {

  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // event listener for deep linking
  Linking.addEventListener('url', (item) => {
    const parsedLink = Linking.parse(item.url);
  });

  async function getUser(){
    const res = await userutil.getUser();
    if (res) {
      setLoggedIn(true);
      setUser(res);
    }
    return res;
  }

  function handleLogin(){
    getUser();
  }

  function handleLogout(){
    setLoggedIn(false);
  }

  useEffect(() => {
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


