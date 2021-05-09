import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { FAB } from 'react-native-paper';
import Empty from './emptyList';
import Location from './location';
import DetailsScreen from './detailsScreen';
import MeetupScreen from '../meetup/meetupScreen';
import MeetupMap from '../meetup/meetupMap';
import JoinMeetup from '../meetup/joinMeetup';
import locationutil from '../utils/location.util';
import myMeetups from '../meetup/myMeetups.jsx';

function MainList({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState();
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    useEffect(() => {
      getData();
    }, []);

    const getData = () => {
      locationutil.getLocations()
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
          <FAB.Group
            style={styles.fab_create}
            open={open}
            label='Meetups'
            icon={open ? 'minus' : 'plus'}
            actions={[
              {
                icon: 'map-marker',
                label: 'Create Meetup',
                onPress: () => navigation.navigate('CreateMeetup')
              },
              {
                icon: 'eye',
                label: 'My Meetups',
                onPress: () => navigation.navigate('MyMeetups')
              }
            ]}
            onStateChange={onStateChange}
          />
        </View>
      );
}

// stack wrapper around main list screen
function MainListScreen({route}) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={MainList} options={{headerLeft: null}}/>
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              // set title of screen to the location title
              options={({ route }) => ({ title: route.params.item.name })} />
            <Stack.Screen name="CreateMeetup" component={MeetupScreen} options={{title: "Create Meetup"}} initialParams={{user: route.params.user}} />
            <Stack.Screen name="MyMeetups" component={myMeetups} options={{title: "My Meetups"}} initialParams={{user: route.params.user}} />
        </Stack.Navigator>
    );
}

export default function ListScreen({route}) {

    const ModalStack = createStackNavigator();

    return (
        <ModalStack.Navigator mode="modal" headerMode="none">
            <ModalStack.Screen name="Main" component={MainListScreen} initialParams={{user: route.params.user}} />
            <ModalStack.Screen name="MeetupMap" component={MeetupMap} initialParams={{user: route.params.user}} />
            <ModalStack.Screen name="JoinMeetup" component={JoinMeetup} initialParams={{ user: route.params.user }} />
        </ModalStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      overflow: 'scroll'
    },
    fab_create: {
      position: 'absolute',
      alignSelf: 'center',
      marginBottom: 16,
      bottom: 0
    },
    fab_view: {
      position: 'absolute',
      alignSelf: 'center',
      marginBottom: 80,
      bottom: 0
    }
});