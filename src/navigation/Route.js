import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthScreen, HomeScreen } from '../screens';
import { AppContext } from '../provider/AppProvider';

const Route = () => {
	const { user } = useContext(AppContext);

	return (
		<NavigationContainer>
			{user && Object.keys(user).length > 0 ? <HomeScreen /> : <AuthScreen />}
		</NavigationContainer>
	);
};

export default Route;
