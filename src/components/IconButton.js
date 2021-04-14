import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const IconButton = ({ name, color, size, buttonStyle, ...otherProps }) => {
	return (
		<TouchableOpacity
			style={[styles.button, { ...buttonStyle }]}
			{...otherProps}
		>
			<FontAwesome {...{ name, color, size }} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: 'blue',
	},
});

export default IconButton;
