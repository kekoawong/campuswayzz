import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View, Text, StyleSheet } from 'react-native';
import Item from './item';
import DetailsScreen from './detailsScreen';


const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

function Empty(){
  return (
    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
      <Text>EMPTY!!</Text>
    </View>
  );
}

function MainList() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <FlatList
            ListEmptyComponent={Empty}
            style={{paddingTop: 20}}
            data={DATA}
            renderItem={Item}
            keyExtractor={(item) => item.id}
          />
          <Button title="Go to Home" onPress={() => navigation.navigate('Details')} />
        </View>
      );
}

export default function ListScreen() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={MainList} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      overflow: 'scroll'
    }
});