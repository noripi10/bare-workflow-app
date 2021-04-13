import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	// user
	const [user, setUser] = useState(null);

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
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
