import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function JoinMeetup() {


    // get navigation, set state
    const navigation = useNavigation();
      
    return (
        <View style={styles.container}>
            <FAB
                style={styles.fab}
                label='Join Meetup'
                icon="walk"
                onPress={() => navigation.navigate('MyModal')}
            />
            <FAB
                style={styles.fab}
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
      backgroundColor: '#fff'
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },
    fab: {
      alignSelf: 'center',
      marginBottom: 16,
      bottom: 0,
      color: 'green',
      position: 'absolute'
    }
});