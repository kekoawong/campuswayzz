import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function () {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Meetup Screen</Text>
            <FAB
                style={styles.fab}
                label='End Meetup'
                icon="stop"
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
      alignSelf: 'center',
      marginBottom: 16,
      bottom: 0,
      backgroundColor: 'red'
    }
});