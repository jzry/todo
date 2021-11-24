import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen.js';
import RegistrationScreen from '../screens/RegistrationScreen.js';
import WorkspaceScreen from '../screens/WorkspaceScreen.js';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
		initialRouteName="Home"
		screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Registration" component={RegistrationScreen} />
    </HomeStack.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
		initialRouteName="Home"
		screenOptions={{headerShown:false}}>
      <MainStack.Screen name="Workspace" component={WorkspaceScreen} />
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Tabs = () => {
	return (
		<Tab.Navigator
			screenOptions = {{
				"headerShown":false,
				"tabBarShowLabel": false,
  				"tabBarStyle": [
					  	{
						  "display": "flex"
						},
						null
					]
				}}
		>
			<Tab.Screen name = "Home" component = { MainStackScreen } options = {{
				tabBarIcon: ({focused}) => (
					<View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
						<Image
							source = { require ('../assets/icons/home.png') }
							resizeMode = "contain"
							style = {{
								width: 25,
								height: 25,
								tintColor: focused ? '#64706f' : '#8BA2A1'
							}}
						/>
						<Text style = {{ color: focused ? '#64706f' : '#8BA2A1', fontSize: 12 }}
						>Home</Text>
					</View>
				),
			}} />
			<Tab.Screen name = "Desk" component = { HomeStackScreen } options = {{
				tabBarIcon: ({focused}) => (
					<View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
						<Image
							source = { require ('../assets/icons/work.png') }
							resizeMode = "contain"
							style = {{
								width: 25,
								height: 25,
								tintColor: focused ? '#64706f' : '#8BA2A1'
							}}
						/>
						<Text style = {{ color: focused ? '#64706f' : '#8BA2A1', fontSize: 12 }}
						>Desk</Text>
					</View>
				),
			}} />
			<Tab.Screen name = "Register" component = { HomeStackScreen } options = {{
				tabBarIcon: ({focused}) => (
					<View style = {{alignItems: 'center', justifyContent: 'center', top: 10}}>
						<Image
							source = { require ('../assets/icons/user.png') }
							resizeMode = "contain"
							style = {{
								width: 25,
								height: 25,
								tintColor: focused ? '#64706f' : '#8BA2A1'
							}}
						/>
						<Text style = {{ color: focused ? '#64706f' : '#8BA2A1', fontSize: 12 }}
						>Register</Text>
					</View>
				),
			}} />
		</Tab.Navigator>
	);
}

export default Tabs;