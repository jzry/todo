import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Task from '../components/Task';
import bp from "./BuildPath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TodoScreen = ({ navigation, route }) => {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task])
		setTask(null);
	}

	// const completeTask = (index) => {
	// 	let itemsCopy = [...taskItems];
	// 	itemsCopy.splice(index, 1);
	// 	setTaskItems(itemsCopy);
	// }

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
                url: bp.BuildPath(`api/lists/read/${route.params?.id}`),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    token: token
                }
            };
			console.log(token)

            axios(axiosConfig)
                .then(async (res) => {
                    const data = res.data;
                    if (data.error) {
                        reject(e);
                        return;
                    }

					let list = null;
					if (data.length > 0)
						list = {
							id: data[0].id,
							key: data[0].id,
							title: data[0].title,
							body: data[0].list || []
						};
                    resolve(list); 
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

	useEffect(() => {
        getLists()
        .then(list => {
            setTaskItems(list.body)
        })
        .catch(_ => {
        });
    }, []);

	return (
		<View style = { styles.container }>

			{/*Today's tasks*/}
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Today's tasks</Text>

				<View style={styles.items}>
					{/*This is where the tasks will go! */}
					{
						
						taskItems?.map((task) => { 
							console.log(task)
							return (
								<TouchableOpacity key={task.completed} 
								// onPress={() => completeTask(task.completed)}
								>
									<Task 
									// key={task.completed}
									 text={task.text} checked={task.completed} />
								</TouchableOpacity>
							)
								
						})
					}
					{/* <Task text={'Task A'}/>
					<Task text={'Task B'}/>
					<Task text={'Task C'}/> */}
				</View>
			</View>
			{/* Write a task */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.writeTaskWrapper}
				>
					<TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
					
					<TouchableOpacity onPress={() => handleAddTask()} >
						<View style={styles.addWrapper}>
							<Text style={styles.addText}>+</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
		</View>
	);
};

export default TodoScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E8EAED',
	},
	tasksWrapper: {
		paddingTop: 30,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	items: {
		marginTop: 30,

	},
	writeTaskWrapper: {
		position: 'absolute',
		bottom: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: '#fff',
		borderRadius: 60,
		borderColor: '#c0c0c0',
		borderWidth: 1,
		width: 250,

	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: '#fff',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#c0c0c0',
		borderWidth: 1,

	},
	addText: {},
});