import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import bp from "./BuildPath.js"
import EmailHelper from './EmailHelper.js';

function ResetPassScreen({ route, navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErr] = useState("");

	function registerUser() {
		setErr("");

		const axiosConfig = {
			method: 'post',
			url: bp.BuildPath('api/users/forgotpassword'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				email: email,
				password: password,
			}
		};

		if (!EmailHelper(email)) {
			setErr("Invalid email.");
			return;
		}

		axios(axiosConfig)
			.then((res) => {
				const data = res.data;
				if (data.error) {
					setErr(data.error);
				}
				// on success
				// switch screen
				setErr("If that email is in our records, a message containing a reset link will be sent to that address.");

				// navigation.navigate('Details');
			})
			.catch((e) => {
				setErr(e.response?.data?.error || error);
			});
	}

	return (
		<View style={styles.container}>

			<Text style={styles.sectionTitle}>We'll send you an email so that you can reset your password.</Text>

			<Image
				style={styles.logo}
				source={require('../assets/icon.png')} />

			<StatusBar style="auto" />

			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="Email"
					placeholderTextColor="#808080"
					secureTextEntry={false}
					onChangeText={(email) => setEmail(email)}
					autoCapitalize='none'
					autoCorrect='false'
				/>
			</View>

			<View>
				<Text style={styles.setColorRed}>{errorMsg}</Text>
			</View>

			<TouchableOpacity style={styles.loginBtn}
				onPress={() => {
					registerUser();
				}}>
				<Text style={styles.loginText}>Send Email</Text>
			</TouchableOpacity>
		</View>
	);
}

export default ResetPassScreen;

const styles = StyleSheet.create({

	sectionTitle: {
		fontSize: 20,
		// fontWeight: 'bold',
		marginBottom: 30,
		marginHorizontal: 50,
	},

	setColorRed: {
		color: '#f44336',
		marginHorizontal: 40,
	},

	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	logo: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},

	inputView: {
		backgroundColor: "#E8EAED",
		borderRadius: 30,
		width: "70%",
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
		textDecorationLine: 'underline',
	},

	loginBtn: {
		width: "70%",
		borderRadius: 30,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
		backgroundColor: "#b9c7c6",
	},
});