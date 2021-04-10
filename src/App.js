import React from 'react';
import AppProvider from './provider/AppProvider';
import NotificationProvider from './provider/NotificationProvider';
import { Route } from './navigation';

export default function App() {
	return (
		<AppProvider>
			<NotificationProvider>
				<Route />
			</NotificationProvider>
		</AppProvider>
	);
}
