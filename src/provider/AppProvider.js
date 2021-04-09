import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
	// notifications
	const [pushToken, setPushToken] = useState('');
	const [notification, setNotification] = useState();
	// user
	const [user, setUser] = useState(null);

	return (
		<AppContext.Provider value={{ user, setUser, pushToken, setPushToken }}>
			{children}
		</AppContext.Provider>
	);
};
export default AppProvider;
