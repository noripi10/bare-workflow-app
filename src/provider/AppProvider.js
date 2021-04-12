import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
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
		<AppContext.Provider value={{ user, setUser }}>
			{children}
		</AppContext.Provider>
	);
};
export default AppProvider;
