import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import ListScreen from './src/list/listScreen';
import MapScreen from './src/map/mapScreen';
import ProfileScreen from './src/profile/profileScreen';
import { linkingConfig } from './src/linking/deepLinking';
import * as Linking from 'expo-linking';

export default function App() {

  // event listener for deep linking
  Linking.addEventListener('url', (item) => {
    console.log(item.url);
    const thing = Linking.parse(item.url);
    console.log(thing);
  });

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
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
}


