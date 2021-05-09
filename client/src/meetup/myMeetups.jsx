import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import meetuputil from '../utils/meetup.util';

const MyComponent = ({route}) => {
    const navigation = useNavigation();
    const userNetID = route['params']['user']['netID'];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'accepted', title: 'Accepted', icon: 'check' },
    { key: 'pending', title: 'Pending', icon: 'email' },
  ]);
  const [acceptedMeetups, setAcceptedMeetups] = React.useState([]);
  const [pendingMeetups, setPendingMeetups] = React.useState([]);

  useEffect(() => {
      getUsersAccept();
      getUsersPending();
  }, []);

  function getUsersAccept(){
      meetuputil.getUsersAccepted(userNetID)
      .then(res => {
          setAcceptedMeetups(res);
          return;
      })
  }

  function getUsersPending(){
    meetuputil.getUsersPending(userNetID)
    .then(res => {
        setPendingMeetups(res);
        return;
    })
  }
  
  function handleAcceptClick(meetupID){
      navigation.navigate('MeetupMap', {meetupID: meetupID});
  }

  function handlePendClick(meetupID){
    navigation.navigate('JoinMeetup', {groupID: meetupID})
  }

  const renderScene = BottomNavigation.SceneMap({
    accepted: AcceptedRoute,
    pending: PendingRoute,
  });

  function AcceptedRoute() {
    const acceptedList = acceptedMeetups.map((meetup) => 
        <DataTable.Row key={meetup._id} onPress={() => handleAcceptClick(meetup._id)}>
            <DataTable.Cell>{meetup.locationName}</DataTable.Cell>
            <DataTable.Cell>{meetup.createdAt.substr(0, 10)}</DataTable.Cell>
        </DataTable.Row>
    )
    return (
        <View style={styles.container_accepted}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>
                {acceptedList}
            </DataTable>
        </View>
    );
  }

  function PendingRoute(){
    const pendingList = pendingMeetups.map((meetup) => 
        <DataTable.Row key={meetup._id} onPress={() => handlePendClick(meetup._id)}>
            <DataTable.Cell>{meetup.locationName}</DataTable.Cell>
            <DataTable.Cell>{meetup.createdAt.substr(0, 10)}</DataTable.Cell>
        </DataTable.Row>
    )   
      return (
        <View style={styles.container_pending}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>
                {pendingList}
            </DataTable>
        </View>
      )
  }

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      barStyle={{backgroundColor: 'blue'}}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;

const styles = StyleSheet.create({
    container_accepted: {
        flex: 1,
        alignItems: 'center'
    },
    container_pending: {
        flex: 1,
        alignItems: 'center'
    }
});