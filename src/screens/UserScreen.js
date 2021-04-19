import React, { useContext } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Constants } from 'react-native-unimodules';
import { Avatar, Button } from 'react-native-paper';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import { BackTile, AppButton } from '../components';
import { AuthContext } from '../provider/AuthProvider';
import { NotificationContent } from '../provider/NotificationProvider';
import { onSignOut } from '../libs/firebase';
import { registerForPushNotificationsAsync } from '../notifications/setup';

const UserScreen = () => {
	const { pushToken } = useContext(NotificationContent);
	const { user } = useContext(AuthContext);

	const getGithubUser = async () => {
		const response = await fetch('https://api.github.com/users/noripi10', {
			method: 'GET',
		});
		const data = await response.json();
		console.log({ data });
	};

	return (
		<BackTile style={styles.container} colors={['#0054A6', '#0072af']}>
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
			<Divider style={styles.divider} />
			<ScrollView contentContainerStyle={styles.mainContainer}>
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
				{/* <Text>{JSON.stringify(user)}</Text> */}
				<AppButton title="ログアウト" onPress={onSignOut} />
				<AppButton title="get github user" onPress={getGithubUser} />
				<Image
					source={{
						uri:
							'https://www.photolibrary.jp/mhd2/img18/450-200606301252262635.jpg',
					}}
					style={{ width: '100%', height: 200 }}
					resizeMethod="auto"
				/>
				<Image
					source={require('../images/sky_00182.jpg')}
					style={{ width: '100%', height: 200 }}
				/>
			</ScrollView>

			<BannerAd
				unitId={TestIds.BANNER}
				size={BannerAdSize.FULL_BANNER}
				requestOptions={{ requestNonPersonalizedAdsOnly: true }}
			/>
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
		height: '23%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	mainContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	displayName: {
		marginTop: 6,
		fontSize: 16,
	},
	divider: {
		alignSelf: 'center',
		marginTop: 10,
		backgroundColor: '#bbb',
		width: '90%',
	},
});

export default UserScreen;
