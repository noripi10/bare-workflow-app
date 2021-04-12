import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AppInput, AppButton, BackTile } from '../components';

import {
	onAuthAnonymous,
	onAuthMailPassword,
	onAuthGoogle,
} from '../libs/firebase';

const AuthScreen = ({ navigation }) => {
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
		await onAuthMailPassword(email, password);
	};

	const registerNavigateHandler = () => {
		navigation.navigate('register');
	};

	return (
		<View style={styles.container}>
			<BackTile>
				<View style={styles.header}>
					<Text style={styles.title}>bare-workflow-app</Text>
					<Text style={styles.subTitle}>sample react-native</Text>
				</View>
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
					<AppButton title="ログインする" onPress={authHandler} />
					<View style={styles.divider} />
					<AppButton title="Google Login" onPress={onAuthGoogle} />
					<AppButton title="新規登録する" onPress={registerNavigateHandler} />
					<AppButton title="ログインしない（匿名）" onPress={onAuthAnonymous} />
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
	header: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 38,
		fontFamily: 'DancingScript-Bold',
	},
	subTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontFamily: 'DancingScript-Medium',
	},
	form: {
		flex: 7,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	divider: {
		marginTop: 50,
	},
});

export default AuthScreen;
