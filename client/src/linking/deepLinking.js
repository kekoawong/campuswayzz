import * as Linking from 'expo-linking';

const list1 = {
    prefixes: [defaultPrefix],
    screens: {
        List: {
            path: "list",
            screens: {
            Main: {
                path: 'main',
                screens: {
                    Listings: 'listings',
                    Details: 'details',
                    CreateMeetup: 'createmeetup',
                    MeetupMap: 'meetupmap'
                }
            },
            MyModal: 'makeMeetup'
            }
        },
        Map: {
            path: "map",
            screens: {
                Map: 'Map',
                Details: 'details'
            }
        },
        Profile: "profile"
    },
};

export const defaultPrefix = Linking.createURL('/');
export const linkingConfig = {
    prefixes: [defaultPrefix],
    screens: {
        List: {
            path: "List",
            screens: {
                Main: {
                    path: "Main",
                    screens: {
                        Listings: "Listings",
                        Details: "Details",
                        CreateMeetup: "CreateMeetup",
                        MeetupMap: "MeetupMap",
                    }
                },
                JoinMeetup: "JoinMeetup",
                MyModal: "MyModal"
            }
        },
        Map: 'Map',
        Profile: 'Profile'
    }
}

