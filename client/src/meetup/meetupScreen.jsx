import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Text, Button, Keyboard, TextInput } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSelect from 'react-native-multiple-select';


const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
  }, {
    id: '16hbajsabsd',
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
    }
];

export default function MeetupScreen() {
    // get navigation, set state
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
      
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            >
            <DropDownPicker 
                style={styles.dropdown} /* the main strip */
                dropDownStyle={styles.dropdownPart}
                containerStyle={
                    {height: 40}
                }
                itemStyle={
                    {justifyContent: 'flex-start'}
                }
                labelStyle={styles.labels}
                items={[
                    {label: 'All Locations', value: 'All'},
                    {label: 'Restaurants', value: 'Restaurant'},
                    {label: 'Recreation', value: 'Recreation'},
                    {label: 'Rest and Relaxation', value: 'R&R'},
                    {label: 'Study Spaces', value: 'Study Space'},
                    {label: 'Shopping', value: 'Shop'},
                    {label: 'Other', value: 'Other'},
                ]}
                defaultValue={'All'}
                onChangeItem={item => setNewMarkers(item.value)}
            />
            <MultiSelect
                items={items}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedItems}
                selectedItems={selectedItems}
                searchInputPlaceholderText='Search Users...'
                displayKey='name'
                searchInputStyle={styles.textInput}
                styleMainWrapper={styles.mainWrapper}
                submitButtonText='Add user'
                submitButtonColor='skyblue'
            />
            <FAB
                style={styles.fab}
                label='Start Meetup'
                icon="walk"
                onPress={() => navigation.navigate('MyModal')}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    dropdown: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    dropdownPart: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    mainWrapper: {
        borderColor: 'black',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 5
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
     },
    textInput: {
        height: 50,
        borderColor: "#000000",
        borderBottomWidth: 1
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },
    fab: {
      alignSelf: 'center',
      marginBottom: 16,
      bottom: 0,
      color: 'green'
    }
});