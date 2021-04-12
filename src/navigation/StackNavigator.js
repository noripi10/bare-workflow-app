import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthScreen, RegisterScreen } from '../screens';

const Stack = createStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="auth"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="auth" component={AuthScreen} />
			<Stack.Screen name="register" component={RegisterScreen} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
