import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const AppButton = ({ title, ...otherProps }) => {
	return (
		<TouchableOpacity style={styles.button} {...otherProps}>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightblue',
		padding: 16,
		margin: 6,
		borderRadius: 32,
		width: 200,
	},
});

export default AppButton;
