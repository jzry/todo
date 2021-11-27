import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen.js';
import RegistrationScreen from '../screens/RegistrationScreen.js';
import TodoScreen from '../screens/TodoScreen.js';
import DeskScreen from '../screens/DeskScreen.js';
import Landing from '../screens/Landing.js';

const RegistrationStack = createNativeStackNavigator();

function RegistrationStackScreen() {
  return (
    <RegistrationStack.Navigator
		initialRouteName="Login"
		screenOptions={{headerShown:true}}>
      <RegistrationStack.Screen name="Login" component={HomeScreen} />
      <RegistrationStack.Screen name="Registration" component={RegistrationScreen} />
    </RegistrationStack.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
		initialRouteName="Todo"
		screenOptions={{headerShown:true}}>
      <MainStack.Screen name="Todo" component={Landing} />
    </MainStack.Navigator>
  );
}

const DeskStack = createNativeStackNavigator();

function DeskStackScreen() {
  return (
    <DeskStack.Navigator
		initialRouteName="Home"
		screenOptions={{headerShown:true}}>
      <DeskStack.Screen name="Lists" component={DeskScreen} />
	  <DeskStack.Screen name="Todo" component={TodoScreen} />
    </DeskStack.Navigator>
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
			<Tab.Screen name = "Desk" component = { DeskStackScreen } options = {{
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
			<Tab.Screen name = "Register" component = { RegistrationStackScreen } options = {{
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