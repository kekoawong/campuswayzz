import React, {useState} from 'react';
import MapView, { 
  Marker,
  Callout
} from 'react-native-maps';

import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';

function MainMap() {

  /* initial coordinates that map will be centered on */
  const initialCoordinates = {
    latitude: 41.7030,
    longitude: -86.2390,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  /* hard-coded marker coordinates - temporary until middleware works */
  const arrLocations = [
    {type:"all", latlng: {latitude: 41.7030, longitude: -86.2390}, name:"Main Building", address:"Main Building,\nNotre Dame, IN 46556", description:"Heart of campus."},
    {type:"restaurant", latlng: {latitude: 41.6984, longitude: -86.2339}, name:"Notre Dame Stadium", address:"2010 Moose Krause Circle,\nNotre Dame, IN 46556", description: "Where the Irish win!"},
    {type:"study", latlng: {latitude: 41.7025, longitude: -86.2341}, name:"Hesburgh Library", address:"284 Hesburgh Library,\nNotre Dame, IN 46556", description:"A great place to study."}
  ]

  /* eventually, make coordinates and markers a state so that they can RELOAD when the user queries */
  const [markerType, setMarkerType] = useState('all');

  return (
      <View style={styles.container}>
        <Button title="Test"></Button>
        <MapView style={styles.map} 
          initialRegion={initialCoordinates}
          showsBuildings={true}
          loadingEnabled={true}
        >
          {arrLocations.map((marker, index) => (
            <Marker 
              key={index}
              coordinate={marker.latlng}
              /*title={marker.name}
              description={marker.address}*/
              /*onPress={() => handleMarkerPress(index) }*/
            >
              <Callout style={styles.plainView}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{marker.name}</Text>
                  <Text>{marker.address}</Text>
                  <Text>{marker.description}</Text>
                </View>
              </Callout>
            </Marker>
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