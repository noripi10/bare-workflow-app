import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const AppButton = ({ title, customStyles, ...otherProps }) => {
	return (
		<TouchableOpacity style={[styles.button, customStyles]} {...otherProps}>
			<Text>{title}</Text>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#458',
		padding: 16,
		margin: 6,
		borderRadius: 32,
		width: 200,
	},
});

export default AppButton;
