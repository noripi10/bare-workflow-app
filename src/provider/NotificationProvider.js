import React, { createContext, useState, useRef, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../notifications/setup';

export const NotificationContent = createContext();

const NotificationProvider = ({ children }) => {
	// notifications
	const [pushToken, setPushToken] = useState('');
	const [notification, setNotification] = useState(null);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
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
		<NotificationContent.Provider value={{ pushToken, setPushToken }}>
			{children}
		</NotificationContent.Provider>
	);
};
export default NotificationProvider;
