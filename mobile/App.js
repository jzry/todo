import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/tabs';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const App = () => {
  console.log("App execeuted");
  return (
    <NavigationContainer>   
      <Tabs/>
    </NavigationContainer>
  );
}

export default App;