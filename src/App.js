import React from 'react';
// import { HoldMenuProvider } from 'react-native-hold-menu';
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
