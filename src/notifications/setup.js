import { Platform } from 'react-native';
import { Constants } from 'react-native-unimodules';
import * as Notifications from 'expo-notifications';
import { enableNetworkProviderAsync } from 'expo-location';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const registerForPushNotificationsAsync = async () => {
	let token;
	if (Constants.isDevice) {
		const {
			status: existingStatus,
		} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			// alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		// alert('Must use physical device for Push Notifications');
		console.log('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};

export const sendPushNotification = async (expoPushToken) => {
	const message = {
		to: expoPushToken,
		sound: 'default',
		title: 'push notification test',
		body: '⚽️🏀🎾',
		data: { date: Date.now().toLocaleString() },
	};
	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Context-Type': 'application/json',
			'Accept-encoding': 'gzip, deflate',
		},
		body: JSON.stringify(message),
	});
};
