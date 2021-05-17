import React, { useEffect, useState } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import { AppButton, AppInput, BackTile, IconButton } from '../components';

// const MenuItems = [
// 	{ text: 'Actions', isTitle: true, onPress: () => {} },
// 	{ text: 'Action 1', onPress: () => {} },
// 	{ text: 'Action 2', withSeperator: true, onPress: () => {} },
// 	{ text: 'Action 3', isDestructive: true, onPress: () => {} },
// ];

const FirebaseDbScreen = () => {
	const [data, setData] = useState([]);
	const [userName, setUserName] = useState('');

	const regUserHandle = async () => {
		if (!!!userName) {
			return false;
		}
		const db = firestore();
		await db.collection('users').add({
			name: userName,
			createDate: firestore.Timestamp.now(),
			updateDate: firestore.Timestamp.now(),
		});
		setUserName('');
	};
	const deleteUserHandler = async (id) => {
		const db = firestore();
		await db.collection('users').doc(id).delete();
	};

	useEffect(() => {
		const db = firestore();
		const subscribe = db
			.collection('users')
			.orderBy('createDate', 'asc')
			.onSnapshot((querySnapshot) => {
				const newCollection = [];

				querySnapshot.forEach((doc) => {
					newCollection.push({ id: doc.id, ...doc.data() });
				});

				// console.log({ newCollection });
				setData(newCollection);
			});

		return () => {
			subscribe();
		};
	}, []);

	return (
		<BackTile colors={['#239', '#932']}>
			<SafeAreaView style={styles.container}>
				<Text>ユーザー情報</Text>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<View
								style={{
									height: 76,
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'flex-start',
									paddingVertical: 8,
									margin: 8,
								}}
							>
								<Text>ID：{item.id}</Text>
								<Text>ユーザー名：{item.name}</Text>
								<Text>登録日{item.createDate.toDate().toString()}</Text>
								<Text>更新日{item.updateDate.toDate().toString()}</Text>
							</View>
							<Pressable
								style={{
									backgroundColor: '#284',
									width: 30,
									heigh: 36,
									borderRadius: 15,
									padding: 8,
								}}
								onPress={() => deleteUserHandler(item.id)}
							>
								<Text>削除</Text>
							</Pressable>
						</View>
					)}
					ItemSeparatorComponent={() => <Divider />}
				/>
				<View style={styles.inputContainer}>
					<AppInput
						customStyles={{ width: 200 }}
						title="ユーザー名"
						value={userName}
						onChangeText={(user) => setUserName(user)}
					/>
					<AppButton
						customStyles={{ width: 80 }}
						title="登録"
						onPress={regUserHandle}
					/>
				</View>
			</SafeAreaView>
			<View style={styles.plusButtonContainer}>
				<IconButton
					name="plus"
					color="#fff"
					size={24}
					buttonStyle={{ backgroundColor: '#000' }}
					onPressEvent={() => alert('click')}
				/>
			</View>
		</BackTile>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 2,
	},
	item: {
		width: 100,
		height: 100,
		borderRadius: 8,
		backgroundColor: 'blue',
	},
	plusButtonContainer: {
		position: 'absolute',
		bottom: 32,
		right: 32,
	},
	inputContainer: {
		margin: 8,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});

export default FirebaseDbScreen;
