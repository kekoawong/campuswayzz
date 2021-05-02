import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Empty() {
    return (
      <View style={styles.container}>
        <Text>EMPTY!!</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }
});
