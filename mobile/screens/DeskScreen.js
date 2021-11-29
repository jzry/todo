import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, ScrollView, View, Image, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bp from "./BuildPath";
import axios from 'axios';
import Dialog from "react-native-dialog";


function DeskScreen({ route, navigation }) {

    const [greet, setGreet] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [lists, setLists] = useState([]);

    const [dialogText, setDialogText] = useState("");
	const [currId, setCurrId] = useState("");
    const [listName, setListName] = useState("");
    
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('morning.');
        if (hrs === 1 || hrs < 17) return setGreet('afternoon.');
        setGreet('evening.');
      };
    
    useEffect(() => {
    findGreet();
    }, []);

    async function addList() {
        Keyboard.dismiss();

        if (listName === "")
            return;

        let token;
        try {
            token = await AsyncStorage.getItem("token");
        } catch (e) {
            alert(e.message);
            return;
        }

        const config = {
            method: 'post',
            url: bp.BuildPath(`api/lists/create`),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                token: token,
                title: listName,
                list: []
            }
        };

        axios(config)
            .then(function (response) {
                const data = response.data;
                if (data.error) {
                    alert(data.error);
                    return;
                }

                const newList = {
                    id: data.id,
                    title: listName,
                    list: []
                };
				
                setLists([...lists, newList]);
                setListName("");

            })
            .catch((error) => {
                alert(error.response?.data?.error || error);
            });
    }

    async function updateList() {

        let token;
        try {
            token = await AsyncStorage.getItem("token");
        } catch (e) {
            alert(e.message);
            return;
        }

        const config = {
            method: 'post',
            url: bp.BuildPath(`api/lists/update`),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                token: token,
                title: dialogText,
                list: [],
                id: currId
            }
        };

        axios(config)
            .then(function (response) {
                const data = response.data;
                if (data.error) {
                    setDialogVisible(false);
                    alert(data.error);
                    return;
                }

                for (let i = 0; i < lists.length; i++) {
                    if (lists[i].id === currId) {
                        lists[i].title = dialogText;
                    }
                }

                setLists(lists);
                setDialogVisible(false);

            })
            .catch((error) => {
                setDialogVisible(false);
                alert(error.response?.data?.error || error);
            });
    }

    async function deleteList() {
        let token;
        try {
            token = await AsyncStorage.getItem("token");
        } catch (e) {
            alert(e.message);
            return;
        }

        const config = {
            method: 'post',
            url: bp.BuildPath(`api/lists/delete`),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                token: token,
                id: currId
            }
        };

        axios(config)
            .then(function (response) {
                const data = response.data;
                if (data.error) {
                    setDialogVisible(false);
                    alert(data.error);
                    return;
                }

				
                setLists(lists.filter(list => list.id !== currId));
                setDialogVisible(false);

            })
            .catch((error) => {
                setDialogVisible(false);
                alert(error);
            });
    }

    function updateMode(id, text) {
        setDialogVisible(true);
        setDialogText(text);
        setCurrId(id);
    }

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
                        listsArray.push({ title: list.title, id: list.id });
                    }

                    resolve(listsArray);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    useEffect(() => {
        getLists().then(ret => {
            setLists(ret);
        });

    }, []);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                <Text style={styles.header}>{`Good ${greet}`}</Text>
                </View>
            </TouchableWithoutFeedback>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Modify List</Dialog.Title>
                <Dialog.Input value={dialogText} onChangeText={(text) => { setDialogText(text) }} />
                <Dialog.Button label="Update" onPress={updateList} />
                <Dialog.Button label="Delete" onPress={deleteList} />
                <Dialog.Button label="Cancel" onPress={()=>setDialogVisible(false)} />
            </Dialog.Container>
            <StatusBar style="auto" />
            {

                lists.map((list) => {
                    return (<TouchableOpacity style={styles.Card}
                        onPress={() => {
                            navigation.navigate("Todo", { id: list.id, title: list.title });
                        }}
                        onLongPress={() => updateMode(list.id, list.title)}>
                        <Text style={styles.loginText}>{list.title}</Text>
                    </TouchableOpacity>)
                })
            }

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={'New list'}
                    value={listName}
                    onChangeText={text => setListName(text)} />

                <TouchableOpacity onPress={() => addList().catch(e => alert(e))} >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

export default DeskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Card: {
        width: "90%",
        borderRadius: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        backgroundColor: '#fff',
        color: "#FFFFFF"
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#c0c0c0',
        borderWidth: 0,
        width: 250,

    }, writeTaskWrapper: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderWidth: 0,
    },
    header: {
        right: 90,
        marginVertical:40,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
    },
    addText: {},
});
