import React from 'react';
import AuthProvider from './provider/AuthProvider';
import NotificationProvider from './provider/NotificationProvider';
import { Route } from './navigation';

export default function App() {
	return (
		<AuthProvider>
			<NotificationProvider>
				<Route />
			</NotificationProvider>
		</AuthProvider>
	);
}
