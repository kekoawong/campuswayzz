import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Rating } from 'react-native-ratings';


// takes in the item object as a prop
export default function Location({ item }, navigation) {

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Details', { item: item })}>
            <Card
                style
                elevation={5}
                style={styles.container}>
                <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>Card stuff</Paragraph>
                    <Rating
                        showRating
                        imageSize={30}
                        style={styles.rating}
                        fractions={2}
                    />
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
    },
    rating: {
        justifyContent: 'flex-start',
        paddingBottom: 15
    }
});