import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import {
	Provider as PaperProvider,
	DefaultTheme as PaperDefaultTheme,
	DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
	DefaultTheme,
	DarkTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import { TabNavigator, StackNavigator } from './index';
import { AuthContext } from '../provider/AuthProvider';

const margDefaultTheme = {
	...PaperDefaultTheme,
	...DefaultTheme,
	colors: {
		...PaperDefaultTheme.colors,
		...DefaultTheme.colors,
	},
};

const margDarkTheme = {
	...PaperDarkTheme,
	...DarkTheme,
	colors: {
		...PaperDarkTheme.colors,
		...DarkTheme.colors,
	},
};

const Route = () => {
	const { user } = useContext(AuthContext);
	const scheme = useColorScheme();
	const isDark = scheme === 'dark';
	return (
		<PaperProvider theme={isDark ? margDarkTheme : margDefaultTheme}>
			<NavigationContainer theme={isDark ? margDarkTheme : margDefaultTheme}>
				{user && Object.keys(user).length > 0 ? (
					<TabNavigator />
				) : (
					<StackNavigator />
				)}
				<StatusBar style="auto" />
			</NavigationContainer>
		</PaperProvider>
	);
};

export default Route;
