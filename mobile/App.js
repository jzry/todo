import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/tabs';

import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {
    const [user, setUser] = useState(true);

    AsyncStorage.getItem("token")
        .then((token) => {
            console.log("ASDF")
            setUser(!token ? true : false);
        })
        .catch();


    return (
        <NavigationContainer>
            <Tabs loggedOut={user} setUser={setUser} />
        </NavigationContainer>
    );
}

export default App;