import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { FAB, Headline, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import Clipboard from 'expo-clipboard';


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

    const redirectUrl = Linking.createURL('List/JoinMeetup');
  
    const copyToClipboard = () => {
      Clipboard.setString(redirectUrl);
      Alert.alert('MeetUp Link', 'Link Copied to Clipboard!');
    };

    // get navigation, set state
    const navigation = useNavigation();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
      
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={5}
            >
            <View style={styles.selector}>
                <Headline>Select Users</Headline>
                <MultiSelect
                    items={items}
                    uniqueKey="id"
                    onSelectedItemsChange={setSelectedUsers}
                    selectedItems={selectedUsers}
                    searchInputPlaceholderText='Search Users...'
                    selectText='Users'
                    displayKey='name'
                    searchInputStyle={styles.textInput}
                    styleDropdownMenu={styles.dropdown}
                    styleDropdownMenuSubsection={styles.dropdown}
                    styleMainWrapper={styles.mainWrapper}
                    submitButtonText='Add users'
                    submitButtonColor='skyblue'
                />
            </View>
            <View style={styles.selector}>
                <Headline>Select Location</Headline>
                <MultiSelect
                    items={items}
                    uniqueKey="id"
                    onSelectedItemsChange={setSelectedLocation}
                    selectedItems={selectedLocation}
                    searchInputPlaceholderText='Search Destinations...'
                    selectText='Destination'
                    displayKey='name'
                    searchInputStyle={styles.textInput}
                    styleDropdownMenu={styles.dropdown}
                    styleDropdownMenuSubsection={styles.dropdown}
                    styleMainWrapper={styles.mainWrapper}
                    submitButtonText='Select Destination'
                    submitButtonColor='skyblue'
                    single
                />
            </View>
            <View style={styles.selector}>
                <Headline>{redirectUrl}</Headline>
                <Button icon="link" mode="contained" onPress={copyToClipboard}>
                  Get Shareable Link
                </Button>
            </View>
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
    selector: {
        marginVertical: 7,
        marginHorizontal: 10
    },
    dropdown: {
        backgroundColor: 'white',
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
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: 'white'
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
      color: 'green',
      position: 'absolute'
    }
});