import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppInput, AppButton, BackTile } from '../components';

import { onRegisterMailPassword } from '../libs/firebase';

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const changeEmail = (text) => {
		setEmail(text);
	};

	const changePassword = (text) => {
		setPassword(text);
	};

	const authHandler = async () => {
		if (!email || !password) {
			alert('ユーザー名またはパスワードが入力されていません');
			return false;
		}
		await onRegisterMailPassword(email, password);
	};

	const backNavigateHandler = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<BackTile>
				<View style={styles.form}>
					<AppInput
						title="メールアドレス"
						autoFocus
						autoCompleteType="email"
						keyboardType="email-address"
						onChangeText={changeEmail}
						value={email}
					/>
					<AppInput
						title="パスワード"
						autoCompleteType="password"
						keyboardType="default"
						secureTextEntry
						onChangeText={changePassword}
						value={password}
					/>
					<AppButton title="登録" onPress={authHandler} />
					<AppButton title="戻る" onPress={backNavigateHandler} />
				</View>
			</BackTile>
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
	form: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	divider: {
		marginTop: 50,
	},
});

export default RegisterScreen;
