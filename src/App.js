import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppProvider from './provider/AppProvider';
import { Route } from './navigation';

export default function App() {
	return (
		<AppProvider>
			<Route />
			<StatusBar style="auto" />
		</AppProvider>
	);
}
