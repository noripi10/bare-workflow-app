import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const AppInput = ({ title, customStyles, ...otherProps }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{title}</Text>
			<TextInput style={[styles.input, customStyles]} {...otherProps} />
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
		borderColor: '#212',
		borderRadius: 8,
		paddingHorizontal: 16,
		marginVertical: 3,
	},
});

export default AppInput;
