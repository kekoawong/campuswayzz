import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


// takes in the item object as a prop
export default function Item({ item }) {

    return (
        <TouchableOpacity>
            <Card
                style
                elevation={5}
                style={styles.container}
                onPress={() => console.log('hi')}
            >
                <Card.Content>
                    <Title>{item.title}</Title>
                    <Paragraph>Card stuff</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({ 
    container: {
        marginBottom: 15,
        marginHorizontal: 10
    }
});