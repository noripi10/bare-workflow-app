import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppProvider from './provider/AppProvider';
import NotificationProvider from './provider/NotificationProvider';
import { Route } from './navigation';

export default function App() {
	return (
		<AppProvider>
			<NotificationProvider>
				<Route />
				<StatusBar style="auto" />
			</NotificationProvider>
		</AppProvider>
	);
}
