import React from 'react';
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

function MainMap() {
  return (
      <View style={styles.container}>
        <Text>Map Screen</Text>
        <MapView style={styles.map} 
          initialRegion={{
            latitude: 41.7030,
            longitude: -86.2390,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsBuildings={true}
          loadingEnabled={true}
        />
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