import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AppInput, AppButton } from '../components';
import { AppContext } from '../provider/AppProvider';

const AuthScreen = () => {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const { setUser } = useContext(AppContext);

	const changeUserId = (text) => {
		setUserId(text);
	};

	const changePassword = (text) => {
		setPassword(text);
	};

	const authHandler = () => {
		if (!userId || !password) {
			alert('ユーザー名またはパスワードが入力されていません');
			return false;
		}
		setUser({ userId, password });
	};

	return (
		<View style={styles.container}>
			<LinearGradient
				style={styles.linerGradient}
				colors={['#5EFCE8', '#736EFE']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<AppInput
					title="ユーザーID"
					onChangeText={changeUserId}
					value={userId}
				/>
				<AppInput
					title="パスワード"
					onChangeText={changePassword}
					value={password}
				/>
				<AppButton title="ログインする" onPress={authHandler} />
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	linerGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
});

export default AuthScreen;
