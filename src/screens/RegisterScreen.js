import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

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
		<BackTile style={styles.container} colors={['#237', '#dde']}>
			<View style={styles.form}>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>Register</Text>
				</View>
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
	headerContainer: {
		margin: 36,
	},
	title: {
		fontFamily: 'DancingScript-Medium',
		fontSize: 26,
	},
	form: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 150,
	},
	divider: {
		marginTop: 50,
	},
});

export default RegisterScreen;
