import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

function HomeScreen({ route, navigation }) {
    return (
      <View style={styles.container}>

      <StatusBar style="auto"/>

      <TouchableOpacity style={styles.Card}
        onPress={() => {
          navigation.navigate('Todo');
        }}>
        <Text style={styles.loginText}>Create a to-do list!</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.Card}
        onPress={() => {
          navigation.navigate('Todo');
        }}>
        <Text style={styles.loginText}>Make a note.</Text>
      </TouchableOpacity>
    </View>
  );
  }
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
        },

        Card: {
          width: "90%",
          borderRadius: 10,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          backgroundColor: "#517470",
        },
  });