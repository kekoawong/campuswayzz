import * as Linking from 'expo-linking';

const exState = {
    "history": [],
    "index": 0,
    "key": "tab-chG2EWi_UY8EVNUkMN8i-",
    "routeNames": [
      "List",
      "Map",
      "Profile",
    ],
    "routes": [
      {
        "key": "List-1",
        "name": "List",
        "params": {
          "initial": true,
          "params": undefined,
          "screen": "JoinMeetup",
          "state": undefined,
          "user": {
            "firstName": "Kekoa",
            "lastName": "Wong",
            "netID": "kwong6",
          },
        },
        "state": {
          "index": 1,
          "key": "stack-1",
          "routeNames": [
            "Main",
            "MeetupMap",
            "JoinMeetup",
          ],
          "routes": [
            {
              "key": "JoinMeetup-1",
              "name": "JoinMeetup",
              "params": {
                "groupID": "609807a2cb4fe21c410de9a3",
                "user": {
                  "firstName": "Kekoa",
                  "lastName": "Wong",
                  "netID": "kwong6",
                },
              },
            },
            {
              "key": "Main-1",
              "name": "Main",
              "params": {
                "user": {
                  "firstName": "Kekoa",
                  "lastName": "Wong",
                  "netID": "kwong6",
                },
              },
              "state": {
                "index": 0,
                "key": "stack-1",
                "routeNames": [
                  "Listings",
                  "Details",
                  "CreateMeetup",
                ],
                "routes": [
                  {
                    "key": "Listings-1",
                    "name": "Listings",
                    "params": undefined,
                  },
                ],
                "stale": false,
                "type": "stack",
              },
            },
          ],
          "stale": false,
          "type": "stack",
        },
      },
      {
        "key": "Map-1",
        "name": "Map",
        "params": {
          "user": {
            "firstName": "Kekoa",
            "lastName": "Wong",
            "netID": "kwong6",
          },
        },
      },
      {
        "key": "Profile-1",
        "name": "Profile",
        "params": {
          "user": {
            "firstName": "Kekoa",
            "lastName": "Wong",
            "netID": "kwong6",
          },
        },
      },
    ],
    "stale": false,
    "type": "tab",
  };

const state1 = {
    type: 'tab',
    key: 'tab-1',
    routeNames: ['Home', 'Profile', 'Settings'],
    routes: [
        {
        key: 'home-1',
        name: 'Home',
        state: {
            key: 'tab-1',
            routeNames: ['Feed', 'Library', 'Favorites'],
            routes: [
            { key: 'feed-1', name: 'Feed', params: { sortBy: 'latest' } },
            { key: 'library-1', name: 'Library' },
            { key: 'favorites-1', name: 'Favorites' },
            ],
            index: 0,
        },
        },
        { key: 'settings-1', name: 'Settings' },
    ],
    index: 1,
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
                JoinMeetup: {
                    path: "JoinMeetup/:groupID",
                },
                MyModal: "MyModal"
            }
        },
        Map: 'Map',
        Profile: 'Profile'
    }
    // getStateFromPath(path, config) {
    //     // Return a state object here
    //     // You can also reuse the default logic by importing `getStateFromPath` from `@react-navigation/native`
    //     const parsedLink = Linking.parse(item.url);
    //     console.log("GETTING IT");
    //     return null;
    // },
}

