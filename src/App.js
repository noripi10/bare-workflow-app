import React from 'react';
import Route from './navigation/Route';
// import { HoldMenuProvider } from 'react-native-hold-menu';
import AuthProvider from './provider/AuthProvider';
import NotificationProvider from './provider/NotificationProvider';
import moment from 'moment';

moment.locale('ja', {
	weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

const App = () => {
	return (
		<AuthProvider>
			<NotificationProvider>
				<Route />
			</NotificationProvider>
		</AuthProvider>
	);
};

export default App;
