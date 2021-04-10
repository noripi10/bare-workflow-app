import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const AppInput = ({ title, ...otherProps }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{title}</Text>
			<TextInput style={styles.input} {...otherProps} />
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		margin: 5,
	},
	label: {
		color: '#219',
	},
	input: {
		width: 250,
		height: 35,
		borderWidth: 0.5,
		borderColor: '#aaa',
		borderRadius: 8,
	},
});

export default AppInput;
