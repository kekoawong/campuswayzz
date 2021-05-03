import * as Linking from 'expo-linking';

export const defaultPrefix = Linking.createURL('/');
export const linkingConfig = {
    prefixes: [defaultPrefix],
    screens: {
    List: {
        path: "list",
        initialRouteName: "Main",
        screens: {
        Main: 'main',
        MyModal: 'makeMeetup'
        }
    },
    Map: "map",
    Profile: "profile"
    },
};