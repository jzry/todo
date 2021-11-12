import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WorkspaceScreen = ({ navigation }) => {
	return (
		<View style = { styles.container }>
			<Text>Here's where you get shit done.</Text>
		</View>
	);
};

export default WorkspaceScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff7e'
	},
});