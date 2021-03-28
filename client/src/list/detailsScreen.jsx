import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';


export default function DetailsScreen({ route, navigation }) {
    // text state
    const [text, setText] = useState('');

    // get item from route params
    const { item } = route.params;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.details}>
            <Text>{item.title}</Text>
            <Button
              title="Go to Details... again"
              onPress={() => console.log(route)}
            />
            <TextInput
              label="Comment"
              value={text}
              onChangeText={text => setText(text)}
            />
        </ScrollView>
        <KeyboardAccessoryNavigation
          avoidKeyboard
          inSafeAreaView
          nextHidden
          previousHidden
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    details: {
      flex: 1
    }
});
