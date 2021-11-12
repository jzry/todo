import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import WorkspaceScreen from '../screens/WorkspaceScreen.js';

const Tab = createBottomTabNavigator();

const Tabs = () => {
	return (
		<Tab.Navigator
			tabBarOptions = {{
				showLabel: false,
				style: {
					backgroundColor: '#ffffff7e'
				}
			}}
		>
			<Tab.Screen name = "Home" component = { HomeScreen } options = {{
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
			<Tab.Screen name = "Login" component = { LoginScreen } options = {{
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
						>Login</Text>
					</View>
				),
			}} />
			<Tab.Screen name = "Desk" component = { WorkspaceScreen } options = {{
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
		</Tab.Navigator>
	);
}

export default Tabs;