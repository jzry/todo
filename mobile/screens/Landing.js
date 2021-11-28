import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';

const Landing = ({ navigation }) => {
	console.log("App execeuted");
	return (
	<View style={styles.container}>
      <Image  
          style={styles.logo}
          source={require('../assets/icon.png')} 
		  />
    </View>
	);
};

export default Landing;

const styles = StyleSheet.create({
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
		backgroundColor: "#ACBAA1",
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
	  },
	
	  loginBtn: {
		width: "80%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		backgroundColor: "#517470",
	  },
});