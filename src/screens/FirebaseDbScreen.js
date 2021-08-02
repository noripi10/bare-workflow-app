import React, { useEffect, useState, memo } from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	FlatList,
	Pressable,
	Alert,
	KeyboardAvoidingView,
} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { firestore, db } from '../libs/firebase';
import { AppButton, AppInput, BackTile, IconButton } from '../components';
import moment from 'moment';

const FirebaseDbScreen = () => {
	const [data, setData] = useState([]);
	const [userName, setUserName] = useState('');

	const regUserHandle = async () => {
		if (!!!userName) {
			return false;
		}
		await db.collection('users').add({
			name: userName,
			createDate: firestore.Timestamp.now(),
			updateDate: firestore.Timestamp.now(),
		});
		setUserName('');
	};
	const deleteUserHandler = (id) => {
		Alert.alert('削除しますか？', `ユーザーID：${id}`, [
			{
				text: 'はい',
				style: 'cancel',
				onPress: async () => await db.collection('users').doc(id).delete(),
			},
			{ text: 'いいえ', style: 'default', onPress: undefined },
		]);
	};

	useEffect(() => {
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
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<BackTile colors={['#239', '#932']}>
				<SafeAreaView style={styles.container}>
					<Text>ユーザー情報</Text>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={data}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<RenderItem {...{ item, deleteUserHandler }} />
						)}
						ItemSeparatorComponent={() => <Divider />}
					/>
					<View style={styles.inputContainer}>
						<AppInput
							customStyles={{ width: 220 }}
							title="ユーザー名"
							value={userName}
							onChangeText={(user) => setUserName(user)}
						/>
						<AppButton
							customStyles={{ width: 65 }}
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
		</KeyboardAvoidingView>
	);
};

const RenderItem = memo(({ item, deleteUserHandler }) => {
	return (
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
					height: 80,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'flex-start',
					paddingVertical: 8,
					margin: 10,
					marginRight: 0,
					width: '85%',
				}}
			>
				<Text>ID：{item.id}</Text>
				<Text>ユーザー名：{item.name}</Text>
				<Text>
					登録日
					{moment(item.createDate.toDate()).format(
						'YYYY年MM月DD日(ddd) HH:mm:ss'
					)}
				</Text>
				<Text>
					更新日
					{moment(item.updateDate.toDate()).format(
						'YYYY年MM月DD日(ddd) HH:mm:ss'
					)}
				</Text>
			</View>
			<Pressable
				style={{
					backgroundColor: '#288',
					width: 30,
					heigh: 36,
					borderRadius: 15,
					padding: 8,
					margin: 6,
				}}
				onPress={() => deleteUserHandler(item.id)}
			>
				<Text>削除</Text>
			</Pressable>
		</View>
	);
});

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
		position: 'absolute',
		bottom: 8,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: 80,
		backgroundColor: '#259',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
	},
});

export default FirebaseDbScreen;
