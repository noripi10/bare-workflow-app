import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import { BackTile, IconButton } from '../components';

// const MenuItems = [
// 	{ text: 'Actions', isTitle: true, onPress: () => {} },
// 	{ text: 'Action 1', onPress: () => {} },
// 	{ text: 'Action 2', withSeperator: true, onPress: () => {} },
// 	{ text: 'Action 3', isDestructive: true, onPress: () => {} },
// ];

const HoldSampleScreen = () => {
	const [data, setData] = useState([]);

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

				console.log({ newCollection });
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
								height: 76,
								width: '100%',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'flex-start',
								padding: 16,
								margin: 8,
							}}
						>
							<Text>ID：{item.id}</Text>
							<Text>ユーザー名：{item.name}</Text>
							<Text>登録日{item.createDate.toDate().toString()}</Text>
							<Text>更新日{item.updateDate.toDate().toString()}</Text>
						</View>
					)}
					ItemSeparatorComponent={() => <Divider />}
				/>
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
});

export default HoldSampleScreen;
