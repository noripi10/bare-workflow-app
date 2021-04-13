import React from 'react';
import { registerRootComponent } from 'expo';
import { AppearanceProvider } from 'react-native-appearance';

import App from './src/App';

const WrapperApp = () => {
	return (
		<AppearanceProvider>
			<App />
		</AppearanceProvider>
	);
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(WrapperApp);
