import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { BackTile, AppButton } from '../components';
import { AppContext } from '../provider/AppProvider';
import { onSignOut } from '../libs/firebase';

const UserScreen = () => {
	const { user } = useContext(AppContext);

	return (
		<BackTile style={styles.container} colors={['blue', 'yellow']}>
			<View style={styles.form}>
				<Text>{JSON.stringify(user)}</Text>
				<AppButton title="ログアウト" onPress={onSignOut} />
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
