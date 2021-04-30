import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import meetuputil from '../utils/meetup.util';

export default function MeetupMap() {
  /* TODO: get destination and userId from previous meetup screen */
  const destination = { latitude: 41.703, longitude: -86.239 };
  const userId = 'jchang5';
  
  const navigation = useNavigation();

  /* initial coordinates that map will be centered on */
  const initialCoordinates = {
    latitude: 41.703,
    longitude: -86.239,
    latitudeDelta: 0.03,
    longitudeDelta: 0.01,
  };

  /* google API for directions */
  const GOOGLE_MAPS_APIKEY = "AIzaSyBiO2kOTm_XtfJLLvVitvEtuzUB3KtRPsY";

  const [userLocation, setUserLocation] = useState({
    coords: { latitude: 41.699437, longitude: -86.23645 },
  });

  /* markers for friends' current locations */
  const [friends, setFriends] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      /* consistently update friends' from the database */
      updateFriendsLocations();

      /* async to update current user location */
      updateUserLocation();
    }, 3000);

    updateUserLocation();

    /* TOOD: add cleanup function to useEffect */
  }, []);

  /* function to update the user's location and push it to the database */
  function updateUserLocation() {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      //console.log(userLocation);
      setUserLocation(userLocation);

      /* push user location to the database for friends' screen */
      let coordinates = {"coordinates": {
          "latitude": userLocation["coords"]["latitude"], 
          "longitude": userLocation["coords"]["longitude"]
      }};

      meetuputil.putUserLocation(userId, coordinates);

    })();
  }

  /* function to set friends' locations by pulling from the database */
  function updateFriendsLocations() {

    /* TODO: pull from the database to grab friends' locations */

    setFriends([{'name': 'Chase', 'coordinates': {'latitude': 41.6984, 'longitude': -86.2339}},
    {'name': 'Jackie', 'coordinates': {'latitude': 41.7031, 'longitude': -86.2390}}]);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MapView
        style={styles.map}
        initialRegion={initialCoordinates}
        showsBuildings={true}
        loadingEnabled={true}
        showsUserLocation={true}
      >
        {friends.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinates} pinColor="blue">
            <Callout style={styles.plainView}>
              <View>
                <Text style={styles.header}>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        <MapViewDirections
          origin={{
            latitude: userLocation["coords"]["latitude"],
            longitude: userLocation["coords"]["longitude"],
          }}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="dodgerblue"
          optimizeWaypoints={true}
          mode="WALKING"
        />
      </MapView>
      <FAB
        style={styles.fab}
        label="End Meetup"
        icon="stop"
        onPress={() => navigation.navigate("Main")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignSelf: "center",
    marginBottom: 16,
    bottom: 0,
    backgroundColor: "red",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
  },
  labels: {
    textAlign: "center",
    color: "#181818",
  },
});
