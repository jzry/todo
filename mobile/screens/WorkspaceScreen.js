import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Task from '../components/Task';

const WorkspaceScreen = ({ navigation }) => {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task])
		setTask(null);
	}

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	}
	return (
		<View style = { styles.container }>

			{/*Today's tasks*/}
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Today's tasks</Text>

				<View style={styles.items}>
					{/*This is where the tasks will go! */}
					{
						taskItems.map((item, index) => { 
							return (
								<TouchableOpacity key={index} onPress={() => completeTask(index)}>
									<Task key={index} text={item} />
								</TouchableOpacity>
							)
								
						})
					}
					<Task text={'Task 1'}/>
					<Task text={'Task 2'}/>
					<Task text={'Task 3'}/>
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

export default WorkspaceScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E8EAED',
	},
	tasksWrapper: {
		paddingTop: 80,
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