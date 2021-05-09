import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Headline } from 'react-native-paper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import meetuputil from '../utils/meetup.util';


export default function JoinMeetup({route, navigation}) {
    const userNetID = route.params.user.netID;
    const meetupID = getFocusedRouteNameFromRoute(route);
      
    return (
        <View style={styles.container}>
            <Headline style={styles.headline}>
              Meetup Request
            </Headline>
            <FAB
                style={styles.fabJoin}
                label='Join Meetup'
                icon="walk"
                onPress={() => {
                  meetuputil.updateUserStatus(meetupID, userNetID, 'Accepted');
                  navigation.navigate('MeetupMap', {meetupID: meetupID});
                }}
            />
            <FAB
                style={styles.fabDeny}
                label='Deny Meetup Request'
                icon="stop"
                onPress={() => {
                  meetuputil.updateUserStatus(meetupID, userNetID, 'Rejected');
                  navigation.navigate('Main');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headline: {
      marginHorizontal: 10,
      marginVertical: 30
    },
    fabDeny: {
      alignSelf: 'center',
      marginVertical: 15,
      backgroundColor: 'red'
    },
    fabJoin: {
      alignSelf: 'center',
      marginVertical: 15
    }
});