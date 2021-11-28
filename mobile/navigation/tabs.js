import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../screens/Login.js';
import RegistrationScreen from '../screens/RegistrationScreen.js';
import TodoScreen from '../screens/TodoScreen.js';
import DeskScreen from '../screens/DeskScreen.js';
import Landing from '../screens/Landing.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/Login.js';


const RegistrationStack = createNativeStackNavigator();

function RegistrationStackScreen() {
	return (
		<RegistrationStack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: true }}>
			<RegistrationStack.Screen name="Login" component={Login} />
			<RegistrationStack.Screen name="Registration" component={RegistrationScreen} />
		</RegistrationStack.Navigator>
	);
}

const DeskStack = createNativeStackNavigator();

	
function userLogout(navigation) {
	Alert.alert(
		"Flourish Logout",
		"Are you sure you want to logout?",
		[
		  {
			text: "Logout",
			onPress: () => {
					 AsyncStorage.setItem("token", "")
					.then(() => {
						AsyncStorage.setItem("user_data", "")
						.then(() => {
							navigation.navigate("Login")
						}).catch(e=>alert(e.message));
					}).catch(e=>alert(e.message));
			},
			style: "destructive",
		  },
		  {
			text: "Cancel",
			style: "Neutral",
		  },
		  
		]
	  );
}

function DeskStackScreen({navigation}) {
	return (
		<DeskStack.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: true }}>
			<DeskStack.Screen name="Lists" component={DeskScreen} options={{
				headerRight: () => (
				  <Button
					onPress={() => userLogout(navigation)}
					title="Logout"
				  />
				),
			  }} />
			<DeskStack.Screen name="Todo" component={TodoScreen} />
		</DeskStack.Navigator>
	);
}

const Stack = createNativeStackNavigator();

function Tabs(props) {

	return (
		<Stack.Navigator
			screenOptions={{
				"headerShown": false,
				"tabBarShowLabel": false,
				"tabBarStyle": [
					{
						"display": "flex"
					},
					null
				]
			}} 
			>
			<Stack.Screen name="Register" component={RegistrationStackScreen} />
			<Stack.Screen name="Desk" component={DeskStackScreen} />
		</Stack.Navigator>
	);
}
export default Tabs;