import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { BackTile, AppButton } from '../components';
import { AppContext } from '../provider/AppProvider';

const UserScreen = () => {
	const { user, setUser } = useContext(AppContext);

	const logoutHandler = () => {
		setUser({});
	};

	return (
		<BackTile style={styles.container} colors={['blue', 'yellow']}>
			<View style={styles.form}>
				<Text>{user.userId}</Text>
				<Text>{user.password}</Text>
				<AppButton title="ログアウト" onPress={logoutHandler} />
			</View>
		</BackTile>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	linerGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	form: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default UserScreen;
