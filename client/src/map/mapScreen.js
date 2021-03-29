import React, {useState} from 'react';
import MapView, { 
  Marker,
  Callout
} from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker'
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
    {type:"all", coordinates: {latitude: 41.7030, longitude: -86.2390}, name:"Main Building", building:"Main Building"},
    {type:"restaurant", coordinates: {latitude: 41.6984, longitude: -86.2339}, name:"Notre Dame Stadium", building: "Stadium"},
    {type:"study", coordinates: {latitude: 41.7025, longitude: -86.2341}, name:"Hesburgh Library", building:"Hesburgh"}
  ]

  const arrLocations1 = [
    {type:"restaurant", coordinates: {latitude: 41.6984, longitude: -86.2339}, name:"Notre Dame Stadium", building: "Stadium"},
  ]

  /* markers are a state so that they can RELOAD when the user queries */
  const [locations, setLocations] = useState(arrLocations);

  function setNewMarkers(type) {
    console.log(type);

    /* call the api */

    /* return array with specific choice */

    /* switch or if statements to get the specific locations?*/

    setLocations(arrLocations1); 
  }

  return (
      <View style={styles.container}>

        <DropDownPicker 
          style={styles.dropdown} /* the main strip */
          dropDownStyle={ /* the dropdown menu itself */
            {backgroundColor: '#fafafa'},
            {width: 250}
          }
          containerStyle={
            {height: 30}
          }
          itemStyle={
            {justifyContent: 'flex-start'}
          }
          labelStyle={
            {textAlign: 'center'}
          }
          items={[
            {label: 'All Locations', value: 'all'},
            {label: 'Restaurants', value: 'restaurant'},
            {label: 'Study Spaces', value: 'study'},
          ]}
          defaultValue={'all'}
          onChangeItem={item => setNewMarkers(item.value)}
        /> 

        <MapView style={styles.map} 
          initialRegion={initialCoordinates}
          showsBuildings={true}
          loadingEnabled={true}
        >
          {locations.map((marker, index) => (
            <Marker 
              key={index}
              coordinate={marker.coordinates}
            >
              <Callout style={styles.plainView}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{marker.name}</Text>
                  <Text>{marker.building}</Text>
                  <Text>{marker.type}</Text>
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
      height: Dimensions.get('window').height - 205,
    },
    dropdown: {
      width: 250,
      //height: Dimensions.get('window').height - 775,
      backgroundColor: '#fafafa',
    }
});