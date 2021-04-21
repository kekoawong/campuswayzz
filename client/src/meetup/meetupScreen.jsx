import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function MeetupScreen() {
    // get navigation, set state
    const navigation = useNavigation();
      
    return (
        <View style={styles.container}>
            <FAB
                style={styles.fab}
                label='Start Meetup'
                icon="walk"
                onPress={() => navigation.navigate('MyModal')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      overflow: 'scroll'
    },
    fab: {
      alignSelf: 'center',
      marginBottom: 16,
      bottom: 0,
      color: 'green'
    }
});