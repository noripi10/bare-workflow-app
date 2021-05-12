import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
} from 'react-native';
import { Text } from 'react-native-paper';
import { BackTile } from '../components';
import { useSQLite } from '../hooks/useSQLite';

const SQLiteScreen = () => {
	const [userList, setUserList] = useState([]);
	const { executeSqlAsync, closeDatabase } = useSQLite('db.db');

	useEffect(() => {
		executeSqlAsync(
			`create table if not exists user (
        id integer primary key not null,
        name text,
        age integer)`
		);
		executeSqlAsync(`select * from user;`).then((result) => {
			setUserList(result.rows._array);
		});

		return () => {
			// closeDatabase();
		};
	}, []);

	const handleAddUser = async () => {
		const userName = 'user' + Math.floor(Math.random() * 1000),
			age = 30;
		const result = await executeSqlAsync(
			`insert into user (name, age) values ("${userName}",${age});`
		);
		setUserList(result.rows._array);
	};

	const handleDeleteUser = async (id) => {
		const result = await executeSqlAsync(`delete user where id = ${id}`);
		setUserList(result.rows._array);
	};
	return (
		<BackTile colors={['#333', '#777']}>
			<SafeAreaView>
				<View style={styles.buttons}>
					<TouchableOpacity style={styles.button} onPress={handleAddUser}>
						<Text>データ追加</Text>
					</TouchableOpacity>
				</View>
				<Text>ユーザー件数：{userList.length}件</Text>
				<FlatList
					style={{ flex: 1 }}
					data={userList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.renderItem}>
							<Text>{item.user}</Text>
							<Text>{item.age}</Text>
						</View>
					)}
				/>
			</SafeAreaView>
		</BackTile>
	);
};

const styles = StyleSheet.create({
	container: {},
	buttons: {
		flexDirection: 'row',
	},
	button: {
		flex: 1,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#212121',
	},
	renderItem: {
		width: '100%',
		height: 30,
		backgroundColor: '#ddd',
		borderBottomWidth: 1,
	},
});

export default SQLiteScreen;
