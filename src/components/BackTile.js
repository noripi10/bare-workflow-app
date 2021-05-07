import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BackTile = ({
	children,
	style = {},
	colors = ['#736EFE', '#5efc90'],
	...otherProps
}) => {
	return (
		<LinearGradient
			style={[styles.linerGradient, { style }]}
			colors={colors}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			{children}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	linerGradient: {
		flex: 1,
		// justifyContent: 'center',
		// width: '100%',
	},
});

export default BackTile;
