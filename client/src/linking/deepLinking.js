import * as Linking from 'expo-linking';

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
                JoinMeetup: {
                    path: "JoinMeetup/:groupID",
                },
                MyModal: "MyModal"
            }
        },
        Map: 'Map',
        Profile: 'Profile'
    }
}

