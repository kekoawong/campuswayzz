import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput} from 'react-native-paper';

function signup() {
    return (
        <View>
            <TextInput mode='outlined' label='First Name' placeholder={'First Name'} value={} onChangeText={}/>
            <TextInput mode='outlined' label='Last Name' placeholder={'Last Name'} value={} onChangeText={}/>
            <TextInput mode='outlined' label='NetID' placeholder={'NetID'} value={} onChangeText={}/>
            <TextInput mode='outlined' label='Password' placeholder={'Password'} value={} onChangeText={}/>
            <Button icon='clipboard-check-outline' mode='contained' onPress={}>
                Login
            </Button>
        </View>
    );
}