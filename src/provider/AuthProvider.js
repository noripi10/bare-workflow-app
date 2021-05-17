import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({
	isAuthenticated: false,
	user: null,
	setUser: () => console.log('not define function'),
	displayUserInfo: () => console.log('not define function'),
});

const AuthProvider = ({ children }) => {
	// user
	const [user, setUser] = useState(null);
	const isAuthenticated = user !== null && Object.keys(user).length > 0;
	const displayUserInfo = () => alert(JSON.stringify(user));

	useEffect(() => {
		const subscribe = auth().onAuthStateChanged((newUser) => {
			if (newUser) {
				setUser(newUser);
			} else {
				setUser({});
			}
		});

		return () => {
			subscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, isAuthenticated, displayUserInfo }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext).isAuthenticated;
export const useDisplayUser = () => useContext(AuthContext).displayUserInfo;
export default AuthProvider;
