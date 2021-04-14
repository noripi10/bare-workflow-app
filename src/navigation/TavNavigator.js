import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SampleScreen, UserScreen } from '../screens';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="home"
			tabBarOptions={{
				style: {
					// position: 'absolute',
					// bottom: 24,
					// left: 10,
					// right: 10,
					// borderRadius: 32,
					// height: 100,
				},
			}}
		>
			<Tab.Screen
				name="home"
				component={HomeScreen}
				options={{
					tabBarLabel: 'ホーム',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="hold"
				component={SampleScreen}
				options={{
					tabBarLabel: 'ホールド',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="star" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="user"
				component={UserScreen}
				options={{
					tabBarLabel: 'ユーザー情報',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="user" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
