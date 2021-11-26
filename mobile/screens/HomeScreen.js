import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	console.log("App execeuted");
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
          placeholder="email"
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
          placeholder="password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
		  autoCapitalize='none'
		  autoCorrect={false}
        />
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
          navigation.navigate('Details');
        }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

    </View>
	);
};

export default HomeScreen;

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