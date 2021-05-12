import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	HomeScreen,
	MapScreen,
	FirebaseDbScreen,
	SQLiteScreen,
	UserScreen,
} from '../screens';
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
				activeTintColor: '#954',
				inactiveTintColor: '#ddd',
			}}
		>
			<Tab.Screen
				name="home"
				component={HomeScreen}
				options={{
					tabBarLabel: 'HOME',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="firebase"
				component={FirebaseDbScreen}
				options={{
					tabBarLabel: 'FIREBASE',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="star" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="sqlite"
				component={SQLiteScreen}
				options={{
					tabBarLabel: 'SQLite',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="star-o" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="map"
				component={MapScreen}
				options={{
					tabBarLabel: 'MAP',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="map-marker" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="user"
				component={UserScreen}
				options={{
					tabBarLabel: 'USER',
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="user" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
