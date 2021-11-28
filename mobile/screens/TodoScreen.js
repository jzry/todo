import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Task from '../components/Task';
import bp from "./BuildPath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dialog from "react-native-dialog";

const TodoScreen = ({ navigation, route }) => {
	const [task, setTask] = useState("");
	const [taskItems, setTaskItems] = useState([]);
	const [dialogVisible, setDialogVisible] = useState(false);
	const [dialogText, setDialogText] = useState("");
	const [currId, setCurrId] = useState("");


	// const completeTask = (index) => {
	// 	let itemsCopy = [...taskItems];
	// 	itemsCopy.splice(index, 1);
	// 	setTaskItems(itemsCopy);
	// }

	async function handleAddTask() {
		Keyboard.dismiss();

		if (task === "")
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
            url: bp.BuildPath(`api/lists/${route.params.id}/create`),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                token: token,
                completed: false,
                text: task
            }
        };

        axios(config)
            .then(function (response) {
                const data = response.data;
                if (data.error) {
					alert(data.error);
                    return;
                }

                const newTask = {
                    id: data.id,
                    text: task,
                    completed: false
                };

                setTaskItems([...taskItems, newTask]);
				setTask("");
            })
            .catch((error) => {
				alert(error.message || error);
            });
    }


	async function toggleComplete(id, completed) {
		let token;
		try {
			token = await AsyncStorage.getItem("token");
		} catch (e) {
			alert(e.message);
			return;
		}

		const config = {
			method: 'post',
			url: bp.BuildPath(`api/lists/${route.params.id}/update/${id}`),
			headers:
			{
				'Content-Type': 'application/json'
			},
			data: {
				token: token,
				completed: !completed
			}
		};

		axios(config)
			.then(function (response) {
				var res = response.data;
				if (res.error) {
					alert(res.error);
					return;
				}

				const editedTaskList = taskItems.map(task => {
					if (id === task.id)
						return { ...task, completed: !completed }

					return task;
				});

				setTaskItems(editedTaskList);
				
			})
			.catch(function (error) {
				console.log(error)
				alert(error.message || error);
			});
	}

	async function deleteTask() {
        const remainingTasks = taskItems.filter(task => currId !== task.id);

			let token;
			try {
				token = await AsyncStorage.getItem("token");
			} catch (e) {
				alert(e.message);
				return;
			}
	
			const config = {
				method: 'post',
				url: bp.BuildPath(`api/lists/${route.params.id}/delete/${currId}`),
				headers:
				{
					'Content-Type': 'application/json'
				},
				data: {
					token: token
				}
			};
	
			axios(config)
				.then(function (response) {
					var res = response.data;
					if (res.error) {
						alert(res.error);
						return;
					}
					setDialogVisible(!dialogVisible);
					setTaskItems(remainingTasks);
					
				})
				.catch(function (error) {
					alert(error.error || error);
				});
		}

	async function updateTask() {
		let token;
		try {
			token = await AsyncStorage.getItem("token");
		} catch (e) {
			alert(e.message);
			return;
		}

		const config = {
			method: 'post',
			url: bp.BuildPath(`api/lists/${route.params.id}/update/${currId}`),
			headers:
			{
				'Content-Type': 'application/json'
			},
			data: {
				token: token,
				text: dialogText
			}
		};

		axios(config)
			.then(function (response) {
				var res = response.data;
				if (res.error) {
					alert(res.error);
					return;
				}

				const editedTaskList = taskItems.map(task => {
					if (currId === task.id)
						return { ...task, text: dialogText }

					return task;
				});
				setDialogVisible(!dialogVisible);

				setTaskItems(editedTaskList);
				
			})
			.catch(function (error) {
				alert(error.error || error);
			});
	}



	function updateMode(id, text) {
		setDialogVisible(!dialogVisible);
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
				url: bp.BuildPath(`api/lists/read/${route.params?.id}`),
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
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
		<View style={styles.container}>
			{/*Today's tasks*/}
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>{route.params.title}</Text>
				<Dialog.Container visible={dialogVisible}>
					<Dialog.Title>Modify Task</Dialog.Title>
					<Dialog.Input value={dialogText} onChangeText={(text)=>{setDialogText(text)}}/>
					<Dialog.Button label="Update" onPress={updateTask} />
					<Dialog.Button label="Delete" onPress={deleteTask} />
					<Dialog.Button label="Cancel" onPress={updateMode} />
				</Dialog.Container>
				<View style={styles.items}>
					{

						taskItems?.map((task, idx) => {
							return (<>
								<TouchableOpacity key={`task-${idx}`}
									onPress={() => toggleComplete(task.id, task.completed)}
									onLongPress={() => updateMode(task.id, task.text)}
								>
								<Task
									key={task.id}
									text={task.text}
									checked={task.completed} />
								</TouchableOpacity>
							</>
							)

						})
					}
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