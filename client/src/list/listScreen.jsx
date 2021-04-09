import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { FAB } from 'react-native-paper';
import Empty from './emptyList';
import Location from './location';
import DetailsScreen from './detailsScreen';
import MeetupScreen from '../meetup/meetupScreen';
import listutil from '../utils/list.util';

function MainList() {
    // get navigation, set state
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
      getData();
    }, []);

    const getData = () => {
      listutil.getLocations()
      .then(res => {
        setData(res)
        return
      })
    }

    // pull down to refresh function
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => { 
        // fetch the data
        setData(getData);
        setRefreshing(false);
      }, 700)
    }

    return (
        <View style={styles.container}>
          <FlatList
            ListEmptyComponent={Empty}
            style={{paddingTop: 20}}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            onRefresh={onRefresh}
            data={data}
            // pass the item data and navigation to the location component
            renderItem={(item) => Location(item, navigation)}
            keyExtractor={(item) => item._id}
          />
          <FAB
            style={styles.fab}
            label='Create Meetup'
            icon="plus"
            onPress={() => navigation.navigate('Meetup')}
          />
        </View>
      );
}

// stack wrapper around main list screen
export default function ListScreen() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={MainList} />
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              // set title of screen to the location title
              options={({ route }) => ({ title: route.params.item.name })} />
            <Stack.Screen name="Meetup" component={MeetupScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      overflow: 'scroll'
    },
    fab: {
      position: 'absolute',
      alignSelf: 'center',
      marginBottom: 16,
      bottom: 0
    }
});