import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import bp from "./BuildPath";
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
	return new Promise(resolve => setTimeout(resolve, timeout));
  }

const Login = ({navigation}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErr] = useState("");

	function loginUser() {
		setErr("");

		if (!email)
			setErr("Please enter a valid email/username.");

		if (!password)
			setErr("Please enter a valid password.");

		// length check password


		const axiosConfig = {
			method: 'post',
			url: bp.BuildPath('api/users/login'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				login: email,
				password: password
			}
		};

		axios(axiosConfig)
			.then(async (res) => {
				const data = res.data;
				if (data.error) {
					setErr(data.error);
				}


				const firstName = data.first_name;
                const lastName = data.last_name;
                const user = {firstName:firstName,lastName:lastName}
				
				try {
					await AsyncStorage.setItem("token", data.token);
					await AsyncStorage.setItem("user_data", JSON.stringify(user));
				} catch (e) {
					setErr(e.message);
				}
				navigation.navigate("Desk");

			})
			.catch((e) => {
				setErr(e.response?.data?.error || e);
			});
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require('../assets/icon.png')}
			/>
			<StatusBar style="auto" />
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="Email or Username"
					placeholderTextColor="#808080"
					secureTextEntry={false}
					onChangeText={(email) => setEmail(email)}
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</View>

			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="Password"
					placeholderTextColor="#808080"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</View>
			<View>
				<Text>{errorMsg}</Text>
			</View>
			<TouchableOpacity>
				<Text
					style={styles.forgot_button}>
					Forgot Password?
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Registration');
				}}>
				<Text
					style={styles.forgot_button}>
					Don't have an account? Create one.
				</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.loginBtn}
				onPress={() => {
					loginUser();
					//   navigation.navigate('Details');
				}}>
				<Text style={styles.loginText}>Login</Text>
			</TouchableOpacity>

		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	logo: {
		width: 150,
		height: 150,
		bottom: 100,
	},

	inputView: {
		backgroundColor: "#E8EAED",
		borderRadius: 30,
		width: "80%",
		height: 45,
		marginBottom: 20,
		alignItems: "center",
	},

	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 0,
	},

	forgot_button: {
		height: 20,
		marginBottom: 0,
	},

	loginBtn: {
		width: "80%",
		borderRadius: 25,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		backgroundColor: "#b9c7c6",
	},
});