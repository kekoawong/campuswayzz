import React, {useState, useEffect} from 'react';
import MapView, { 
  Marker,
  Callout
} from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import DetailsScreen from '../list/detailsScreen';
import locationutil from '../utils/location.util';
import * as Location from 'expo-location';

function MainMap({route}) {

  /* initial coordinates that map will be centered on */
  const initialCoordinates = {
    latitude: 41.7030,
    longitude: -86.2390,
    latitudeDelta: 0.03,
    longitudeDelta: 0.01,
  }

  /* google API for directions */
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBiO2kOTm_XtfJLLvVitvEtuzUB3KtRPsY';

  /* markers are a state so that they can RELOAD when the user queries */
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    /* show all locations */
    setNewMarkers('All');

    /* set initial user location to the dome while request waits */
    setUserLocation({"coords": {latitude: 41.7030, longitude: -86.2390}});

    /* get and set user location at the start */
    (async () => {
      let {status} = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      console.log(userLocation);
      setUserLocation(userLocation);

      /* TODO: push user location to the database */
    })();
  }, []);

  function setNewMarkers(type) {
    console.log(type);

    /* call the api to pull locations from the database */    
    if (type == 'All') {
      locationutil.getLocations()
        .then(res => {
        setLocations(res)
        return
      })
    }
    else {
      locationutil.getLocationsForType(type)
      .then(res => {
        setLocations(res)
        return
      })
    }

  }

  /* TODO: function to continuously get and set user location in the database */

  function toggleDirections(destCoordinates) {
    console.log(destCoordinates)

    /* set directions destination */
    setDestination(destCoordinates);

    /* TODO: get new user location -> CHANGE THIS TO SIMPLY PULL FROM THE DATABSASE */
    (async () => {
      let {status} = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      console.log(userLocation);
      setUserLocation(userLocation);
    })();

    /* toggle directions */
    setShowDirections(!showDirections);
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
              {label: 'Shopping', value: 'Shop'},
              {label: 'Other', value: 'Other'},
            ]}
            defaultValue={'All'}
            onChangeItem={item => setNewMarkers(item.value)}
          />

        <MapView style={styles.map} 
          initialRegion={initialCoordinates}
          showsBuildings={true}
          loadingEnabled={true}
          showsUserLocation={true}
        >
          {locations.map((marker, index) => (
            <Marker 
              key={index}
              coordinate={marker.coordinates}
            >
              <Callout 
                style={styles.plainView}
                onPress={() => {
                  toggleDirections(marker.coordinates)
                  console.log(marker);
                  //navigation.navigate('Details', { item: marker })
                }}>
                <View>
                  <Text style={styles.header}>{marker.name}</Text>
                  <Text style={{ fontStyle: 'italic' }}>{marker.type}</Text>
                  <Text>{marker.building}</Text>
                  <Text></Text>
                  <TouchableOpacity 
                    style={styles.button}>
                    <Text style={styles.buttonText}>Toggle Directions</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))}

        {showDirections && 
            <MapViewDirections
              origin={{latitude: userLocation["coords"]["latitude"], longitude: userLocation["coords"]["longitude"]}}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={2}
              strokeColor="#004EFF"
              optimizeWaypoints={true}
              mode="WALKING"
          />
        }

        </MapView>

      </View>
    );
}

export default function MapScreen({route}) {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator>
          <Stack.Screen name="Map" component={MainMap} initialParams={{user: route.params.user}} />
          <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              // set title of screen to the location title
              options={({ route }) => ({ title: route.params.item.name })}
          />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1
    },
    dropdown: {
      width: 275,
      //height: 50,
      backgroundColor: 'transparent'
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
    },
    button: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 10,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 10,
      color: '#fff',
    }
});