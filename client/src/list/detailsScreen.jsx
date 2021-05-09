import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Card, Title, Subheading, Paragraph } from 'react-native-paper';


export default function DetailsScreen({ route, navigation }) {
    // text state
    const [text, setText] = useState('');
    const [keyboardOffset, setKeyboardOffset] = useState(100);

    // get item from route params
    const { item } = route.params;
    return (
        <View style={styles.container}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={"position"} keyboardVerticalOffset={keyboardOffset}>
              <Card>
                  {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Content>
                    <Title style={styles.cardTitle}>{item.name}</Title>
                    <Subheading>{item.building}</Subheading>
                    <Paragraph style={{ fontStyle: 'italic' }}>{item.type}</Paragraph>
                    <Paragraph>{item.description}</Paragraph>
                  </Card.Content>
              </Card>
              {/* <Card>
                  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                  <Card.Content>
                    <Title style={styles.cardTitle}>{item.name}</Title>
                    <Subheading>{item.type}</Subheading>
                  </Card.Content>
              </Card>
              <TextInput
                label="Comment"
                multiline
                on
                textAlignVertical={'top'}
                onContentSizeChange={() => setKeyboardOffset(keyboardOffset+1)}
                value={text}
                onChangeText={text => setText(text)}
              /> */}
            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    details: {
      flex: 1
    },
    cardTitle: {
      paddingTop: 5
    },
    keyboardAvoid: {
      flex: 1
    }
});
