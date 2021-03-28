import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';


export default function DetailsScreen({ route, navigation }) {
    // text state
    const [text, setText] = useState('');

    // get item from route params
    const { item } = route.params;
    return (
      <View style={styles.container}>
        <Text>{item.title}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => console.log(item)}
        />
        <TextInput
          label="Comment"
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      overflow: 'scroll'
    }
});
