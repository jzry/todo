import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bp from "./BuildPath";
import axios from 'axios';

function DeskScreen({ route, navigation }) {

    const [lists, setLists] = useState([]);

    function getLists() {
        return new Promise(async (resolve, reject) => {
            let token;
            try {
                token = await AsyncStorage.getItem("token");
            } catch (e) {
                reject(e);
            }

            const axiosConfig = {
                method: 'post',
                url: bp.BuildPath('api/lists/read'),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    search: "",
                    token: token
                }
            };

            axios(axiosConfig)
                .then(async (res) => {
                    const data = res.data;
                    if (data.error) {
                        reject(e);
                        return;
                    }

                    let listsArray = [];

                    for (const list of data) {
                        listsArray.push({title: list.title, id: list.id});
                    }

                    resolve(listsArray); 
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    useEffect(()=>{


    getLists().then(ret => {
        setLists(ret?.map((list) => {
            console.log(list)
            return (<TouchableOpacity style={styles.Card}
                onPress={() => {
                    navigation.navigate('Todo', {id: list.id});
                }}>
                <Text style={styles.loginText}>{list.title}</Text>
            </TouchableOpacity>)
        }));
    });

},[]);

    return (
        <View style={styles.container}>

            <StatusBar style="auto" />
            {lists}

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