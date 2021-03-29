import React, {useState} from 'react';
import MapView, { 
  Marker,
  Callout
} from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker'
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
/* import maputil from '../utils/'; */

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
    {type:"Other", coordinates: {latitude: 41.7030, longitude: -86.2390}, name:"Main Building", building:"Main Building"},
    {type:"Recreation", coordinates: {latitude: 41.6984, longitude: -86.2339}, name:"Notre Dame Stadium", building: "Notre Dame Stadium"},
    {type:"Study Space", coordinates: {latitude: 41.7025, longitude: -86.2341}, name:"Hesburgh Library", building:"Hesburgh Library"}
  ]

  const arrLocations1 = [
    {type:"Recreation", coordinates: {latitude: 41.6984, longitude: -86.2339}, name:"Notre Dame Stadium", building: "Stadium"},
  ]

  /* markers are a state so that they can RELOAD when the user queries */
  const [locations, setLocations] = useState(arrLocations);

  function setNewMarkers(type) {
    console.log(type);

    /* call the api */
    /*
    if (type == 'All') {
      maputil.getLocations()
        .then(res => {
        setLocations(res)
        return
      })
    }
    else {
      maputil.getLocationsForType(type)
      .then(res => {
        setLocations(res)
        return
      })
    }
    */

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
            {width: 275}
          }
          containerStyle={
            {height: 40}
          }
          itemStyle={
            {justifyContent: 'flex-start'}
          }
          labelStyle={styles.labels}
          items={[
            {label: 'All Locations', value: 'All'},
            {label: 'Restaurants', value: 'Restaurant'},
            {label: 'Recreation', value: 'Recreation'},
            {label: 'Rest and Relaxation', value: 'R&R'},
            {label: 'Study Spaces', value: 'Study Space'},
            {label: 'Other', value: 'Other'},
          ]}
          defaultValue={'All'}
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
                  <Text style={styles.header}>{marker.name}</Text>
                  <Text style={{ fontStyle: 'italic' }}>{marker.type}</Text>
                  <Text>{marker.building}</Text>
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
      flex: 1
    },
    dropdown: {
      width: 275,
      //height: 50,
      backgroundColor: 'transparent',
      //position: 'absolute',
      //bottom: 580,
      //left: 0,
      //right: -105,
      //left: -135,
      //alignItems: 'center',
      //top: 0,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16
    },
    labels: {
      textAlign: 'center',
      color: '#181818'
    }
});