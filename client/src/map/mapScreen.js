import React, {useState} from 'react';
import MapView, { Marker } from 'react-native-maps';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

function MainMap() {

  /* initial coordinates that map will be centered on */
  const initialCoordinates = {
    latitude: 41.7030,
    longitude: -86.2390,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  /* hard-coded marker coordinates - temporary until middleware works */
  const arrCoordinates = [
    {latitude: 41.7030, longitude: -86.2390},
    {latitude: 41.7035, longitude: -86.2390},
    {latitude: 41.7025, longitude: -86.2390}
  ]

  /* eventually, make coordinates and markers a state so that they can RELOAD when the user queries */

  /* state for type of places showing */
  /*const [locationType, setLocationType] = useState('all');*/

  /* function onClick for marker */

  return (
      <View style={styles.container}>
        <MapView style={styles.map} 
          initialRegion={initialCoordinates}
          showsBuildings={true}
          loadingEnabled={true}
        >
          {arrCoordinates.map((coord, index) => (
            <Marker 
              key={index}
              coordinate={coord}
            />
          ))}
        </MapView>
      </View>
    );
}

export default function MapScreen() {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator>
          <Stack.Screen name="Map" component={MainMap} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});