import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { Avatar, Button } from 'react-native-paper';

import { BackTile, AppButton } from '../components';
import { AuthContext } from '../provider/AuthProvider';
import { NotificationContent } from '../provider/NotificationProvider';
import { onSignOut } from '../libs/firebase';
import { registerForPushNotificationsAsync } from '../notifications/setup';

const UserScreen = () => {
	const { pushToken } = useContext(NotificationContent);
	const { user } = useContext(AuthContext);

	return (
		<BackTile style={styles.container} colors={['#0054A6', '#0072BC']}>
			<View style={styles.avatarContainer}>
				{user.photoURL ? (
					<Avatar.Image size={90} source={{ uri: user.photoURL }} />
				) : (
					<Avatar.Icon
						size={90}
						icon="account"
						style={{ backgroundColor: '#234' }}
					/>
				)}
				<Text style={styles.displayName}>{user.displayName || user.email}</Text>
			</View>
			<View style={styles.mainContainer}>
				<Text>{Constants.isDevice ? 'Real Device' : 'Not Real Device'}</Text>
				<Text>{`pushToken : ${pushToken}`}</Text>
				<Button
					color="#212212"
					mode="contained"
					icon="key"
					onPress={registerForPushNotificationsAsync}
				>
					プッシュトークン取得
				</Button>
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
	avatarContainer: {
		flex: 3,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	mainContainer: {
		flex: 9,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	displayName: {
		marginTop: 6,
		fontSize: 16,
	},
});

export default UserScreen;
