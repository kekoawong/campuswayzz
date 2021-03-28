import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import Empty from './emptyList';
import Location from './location';
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


function getData() {
  return DATA;
}

function MainList() {
    // get navigation, set state
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(getData());

    // pull down to refresh function
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => { 
        // fetch the data
        setData(getData());
        setRefreshing(false);
      }, 700)
    }

    return (
        <View style={styles.container}>
          <FlatList
            ListEmptyComponent={Empty}
            style={{paddingTop: 20}}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            onRefresh={onRefresh}
            data={data}
            // pass the item data and navigation to the location component
            renderItem={(item) => Location(item, navigation)}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
}

// stack wrapper around main list screen
export default function ListScreen() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Listings" component={MainList} />
            <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              options={({ route }) => ({ title: route.params.title })} />
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