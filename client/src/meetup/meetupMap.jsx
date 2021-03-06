import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import { FAB } from "react-native-paper";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import * as Location from "expo-location";
import userutil from '../utils/user.util';
import meetuputil from '../utils/meetup.util';

export default function MeetupMap({ route, navigation }) {
  /* TODO: get destination and userId from previous meetup screen */
  const [destination, setDestination] = useState({ name: "Main Building", coordinates: {latitude: 41.703, longitude: -86.239} });
  const userId = route.params.user.netID;
  // TEMPORARY MEETUPID
  const meetupID = route.params['meetupID'];
  const [loop, setLoop] = useState();

  // make shareable link
  const redirectUrl = Linking.createURL('List/JoinMeetup') + "/" + String(meetupID);

  // function to copy link to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(redirectUrl);
    Alert.alert('MeetUp Link', 'Link Copied to Clipboard!');
  };

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
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    setLoop(
      setInterval(() => {
        /* consistently update friends' from the database */
        updateFriendsLocations();

        /* async to update current user location */
        updateUserLocation();
      }, 3000)
    );

    getMeetupLocation()
    .then(response => {
      setDestination(response);
    })

    updateUserLocation();

    console.log(destination);
    console.log(friends);

    return function cleanup(){
      clearInterval(loop);
    }

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
      setUserLocation(userLocation);

      let coordinates = {"coordinates": {
          "latitude": userLocation["coords"]["latitude"], 
          "longitude": userLocation["coords"]["longitude"]
      }};

      setShowDirections(true);

      /* push user location to the database for friends' screen */
      userutil.putUserLocation(userId, coordinates);

    })();
  }

  /* function to set friends' locations by pulling from the database */
  function updateFriendsLocations() {

    /* TODO: pull from the database to grab friends' locations */
    getFriendsLocation().then(response => {
      setFriends(response);
    })
    
  }

  async function getFriendsLocation(){
    return await meetuputil.getFriendsLocation(meetupID, userId);
  }

  async function getMeetupLocation(){
    return await meetuputil.getMeetupLocation(meetupID);
  }

  function findDistance() {
    const x1 = userLocation["coords"]["latitude"];
    const x2 = destination["coordinates"]["latitude"];
    const y1 = userLocation["coords"]["longitude"];
    const y2 = destination["coordinates"]["longitude"];

    let lon1 = y1 * Math.PI / 180;
    let lon2 = y2 * Math.PI / 180;
    let lat1 = x1 * Math.PI / 180;
    let lat2 = x2 * Math.PI / 180;
   
    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2);
    let c = 2 * Math.asin(Math.sqrt(a));
   
    // Radius of earth in kilometers. Use 3956 for miles
    let r = 6371;
   
    // calculate the result --> assume walk time is 18 minutes per one mile 
    return Math.round((c * r) * 18);
  }

  function handleLeaveMeetup(){
    meetuputil.updateUserStatus(meetupID, userId, 'Rejected');
    clearInterval(loop);
    navigation.navigate("Main");
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
                <Text>{marker.firstName} {marker.lastName}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        <Marker coordinate={destination["coordinates"]} pinColor="green">
          <Callout style={styles.plainView}>
          <View>
                <Text style={styles.header}>{destination["name"]}</Text>
                <Text style={{ color: '#0000FF' }}>{findDistance()} Minute Walk (Approx.)</Text>
              </View>
          </Callout>
        </Marker>
        {showDirections && <MapViewDirections
          origin={{
            latitude: userLocation["coords"]["latitude"],
            longitude: userLocation["coords"]["longitude"],
          }}
          destination={destination["coordinates"]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#004EFF"
          optimizeWaypoints={true}
          mode="WALKING"
        />}
      </MapView>
      <View style={styles.buttons}>
        <FAB
          style={styles.fabLink}
          label="Share Meetup Link"
          icon="link"
          onPress={copyToClipboard}
        />
        <FAB
          style={styles.fabStop}
          label="Leave Meetup"
          icon="stop"
          onPress={handleLeaveMeetup}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    position: 'absolute',
    marginBottom: 16,
    bottom: 0
  },
  fabLink: {
    marginVertical: 10,
    backgroundColor: "blueviolet",
  },
  fabStop: {
    marginVertical: 10,
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
