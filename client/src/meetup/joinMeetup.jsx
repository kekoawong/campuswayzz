import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function JoinMeetup() {


    // get navigation, set state
    const navigation = useNavigation();
      
    return (
        <View style={styles.container}>
            <Headline style={styles.headline}>
              Meetup Request from Deez
            </Headline>
            <FAB
                style={styles.fabJoin}
                label='Join Meetup'
                icon="walk"
                onPress={() => navigation.navigate('MyModal')}
            />
            <FAB
                style={styles.fabDeny}
                label='Deny Meetup Request'
                icon="stop"
                onPress={() => navigation.navigate('Listings')}
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
      marginVertical: 5
    },
    fabDeny: {
      alignSelf: 'center',
      marginVertical: 20,
      backgroundColor: 'red'
    },
    fabJoin: {
      alignSelf: 'center',
      marginVertical: 20
    }
});