import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { AuthScreen } from '../screens';
import { TabNavigator, StackNavigator } from './index';
import { AppContext } from '../provider/AppProvider';

const Route = () => {
	const { user } = useContext(AppContext);

	return (
		<NavigationContainer theme={DarkTheme}>
			{user && Object.keys(user).length > 0 ? (
				<TabNavigator />
			) : (
				<StackNavigator />
			)}
			<StatusBar style="auto" />
		</NavigationContainer>
	);
};

export default Route;
