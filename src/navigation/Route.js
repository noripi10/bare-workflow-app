import React, { useContext, useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../notifications/setup';

import { AppContext } from '../provider/AppProvider';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens';

const Route = () => {
	const { setPushToken } = useContext(AppContext);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				// setNotification(notification);
				console.log({ notification });
			}
		);

		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				alert(JSON.stringify(response));
			}
		);

		return () => {
			Notifications.removeNotificationSubscription(notificationListener);
			Notifications.removeNotificationSubscription(responseListener);
		};
	}, []);

	return (
		<NavigationContainer>
			<HomeScreen />
		</NavigationContainer>
	);
};

export default Route;
