import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

function DeskScreen({ route, navigation }) {
    return (
      <View style={styles.container}>

      <StatusBar style="auto"/>

      <TouchableOpacity style={styles.Card}
        onPress={() => {
          navigation.navigate('Todo');
        }}>
        <Text style={styles.loginText}>List 1</Text>
      </TouchableOpacity>
  
      <TouchableOpacity style={styles.Card}
        onPress={() => {
          navigation.navigate('Todo');
        }}>
        <Text style={styles.loginText}>List 2</Text>
      </TouchableOpacity>
    </View>
  );
  }
  
  export default DeskScreen;
  
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