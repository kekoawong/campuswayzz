import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { FAB, Headline, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MultiSelect from 'react-native-multiple-select';
import locationutil from '../utils/location.util';
import userutil from '../utils/user.util';
import meetuputil from '../utils/meetup.util';

export default function MeetupScreen({route}) {
    // get navigation, set state
    const navigation = useNavigation();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [visible, setVisible] = useState(false);
    
    const [allUserNetIDs, setAllUserNetIDs] = useState([{'netID': 'Loading'}]);
    const [allLocations, setAllLocations] = useState([{'name': 'Loading'}]);


    useEffect(() => {
      getAllLocationNames().then(response => {
        setAllLocations(response);
      })
      getAllUserNetIDs().then(response => {
        setAllUserNetIDs(response);
      })
    }, []);

    async function getAllLocationNames(){
      return await locationutil.getAllLocationNames();
    }
    async function getAllUserNetIDs(){
      return await userutil.getAllUserNetIDs(route.params.user.netID);
    }

    function handleMeetupPost(){

      // ensure that at least one location and user
      if ( selectedLocation.length == 0 && selectedUsers.length == 0) {
          setVisible(true);
          return;
      }

      let friendsArray = [{"netID": route.params.user.netID, "status": "Accepted"}];
      for (const i in selectedUsers){
        friendsArray.push({"netID": selectedUsers[i], "status": "Pending"});
      }
      let requestBody = {"locationName": selectedLocation[0], "friends": friendsArray};
      postMeetup(requestBody).then(response => {
        console.log('LOOK HERE');
        console.log(response);
        navigation.navigate('MeetupMap', {meetupID: response['_id']});
      })
    }

    async function postMeetup(requestBody){
      return await meetuputil.postMeetup(requestBody);
    }

    return (
      /* TODO 
      -- ensure that users put in at least 1 location and 1 user
      */
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={5}
            >
            <View style={styles.selector}>
                <Headline>Select Users</Headline>
                <MultiSelect
                    items={allUserNetIDs}
                    uniqueKey="netID"
                    onSelectedItemsChange={setSelectedUsers}
                    selectedItems={selectedUsers}
                    searchInputPlaceholderText='Search Users...'
                    selectText='Users'
                    displayKey='netID'
                    searchInputStyle={styles.textInput}
                    styleDropdownMenu={styles.dropdown}
                    styleDropdownMenuSubsection={styles.dropdown}
                    styleMainWrapper={styles.mainWrapper}
                    styleListContainer={styles.listContainer}
                    submitButtonText='Add users'
                    submitButtonColor='skyblue'
                />
            </View>
            <View style={styles.selector}>
                <Headline>Select Location</Headline>
                <MultiSelect
                    items={allLocations}
                    fixedHeight
                    uniqueKey="name"
                    onSelectedItemsChange={setSelectedLocation}
                    selectedItems={selectedLocation}
                    searchInputPlaceholderText='Search Destinations...'
                    selectText='Destination'
                    displayKey='name'
                    searchInputStyle={styles.textInput}
                    styleDropdownMenu={styles.dropdown}
                    styleMainWrapper={styles.mainWrapper}
                    styleListContainer={styles.listContainer}
                    submitButtonText='Select Destination'
                    submitButtonColor='skyblue'
                    single
                />
            </View>
            <FAB
                style={styles.fab}
                label='Start Meetup'
                icon="walk"
                onPress={handleMeetupPost}
            />
            <Snackbar
              visible={visible}
              onDismiss={() => setVisible(false)}
              action={{
                label: 'Dismiss',
                onPress: () => {
                  setVisible(false);
                },
              }}>
              Must have at least one user and a location.
            </Snackbar>
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
    listContainer: {
      backgroundColor: 'white',
      maxHeight: 200
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