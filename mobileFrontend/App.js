import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("App execeuted");
  return (
    <View style={styles.container}>
      <Image  
          style={styles.logo}
          source={require('./assets/logo.png')} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="email"
          placeholderTextColor="#808080"
          secureTextEntry={false}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
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
          navigation.navigate('Registration', {
            itemId: 90,
            otherParam: 'anything you want here',
          });
        }}>
        <Text 
          style={styles.forgot_button}>
          Don't have an account? Create one
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

function RegistrationScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
    <Image  
        style={styles.logo}
        source={require('./assets/logo.png')} />

    <StatusBar style="auto" />

    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="email"
        placeholderTextColor="#808080"
        secureTextEntry={false}
        onChangeText={(email) => setEmail(email)}
      />
    </View>

    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="password"
        placeholderTextColor="#808080"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
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
        navigation.navigate('Home', {
          itemId: 90,
          otherParam: 'anything you want here',
        });
      }}>
      <Text 
        style={styles.forgot_button}>
        Already have an account? Log in
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.loginBtn}
      onPress={() => {
        navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        });
      }}>
      <Text style={styles.loginText}>Register</Text>
    </TouchableOpacity>
  </View>
);
}

function Homepage({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={styles.container}>
    <Image  
        style={styles.logo}
        source={require('./assets/logo.png')} />

    <StatusBar style="auto" />


    <TouchableOpacity>
      <Text 
        style={styles.forgot_button}>
        Forgot Password?
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Home', {
          itemId: 90,
          otherParam: 'anything you want here',
        });
      }}>
      <Text 
        style={styles.forgot_button}>
        Already have an account? Log in
      </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.loginBtn}
      onPress={() => {
        navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        });
      }}>
      <Text style={styles.loginText}>Register</Text>
    </TouchableOpacity>
  </View>
);
}

function DetailsScreen({ route, navigation }) {
    const { itemId, otherParam } = route.params;
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      
      <Button
        title="Go to Details... again"
        onPress={() => 
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{ title: 'Overview' }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
    marginTop: 50,
    backgroundColor: "#517470",
  },

});

export default App;