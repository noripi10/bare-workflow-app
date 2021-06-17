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
	const { db, executeSqlAsync } = useSQLite('db.db');

	useEffect(() => {
		executeSqlAsync(
			`create table if not exists user (
        id integer primary key not null,
        name text,
        age integer)`
		);
		// executeSqlAsync(`select * from user`).then((result) => {
		//   const { rows: { _array : dataList} } = result
		// 	setUserList(dataList);
		// });

		db.exec(
			[{ sql: 'select * from user', args: [] }],
			false,
			(error, resultSet) => {
				// console.log(resultSet[0].rows);
				setUserList(resultSet[0].rows);
			}
		);

		return () => {
			// closeDatabase();
		};
	}, []);

	const handleAddUser = async () => {
		const userName = 'user' + Math.floor(Math.random() * 1000),
			age = Math.floor(Math.random() * 100);
		await executeSqlAsync(
			`insert into user (name, age) values ("${userName}",${age});`
		);
		executeSqlAsync(`select * from user`).then((result) => {
			setUserList(result.rows._array);
		});
	};

	const handleDeleteUser = async (id) => {
		await executeSqlAsync(`delete from user where id = ${id}`);
		executeSqlAsync(`select * from user`).then((result) => {
			setUserList(result.rows._array);
		});
	};

	const handleDeleteAllUser = async (id) => {
		await executeSqlAsync(`delete from user`);
		setUserList([]);
	};

	return (
		<BackTile colors={['#333', '#777']}>
			<SafeAreaView />
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.button} onPress={handleAddUser}>
					<Text>データ追加</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleDeleteAllUser}>
					<Text>全件削除</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.list}>
				<Text>ユーザー件数：{userList.length}件</Text>
				<FlatList
					data={userList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View style={styles.renderItem}>
							<Text>
								{item.id} {item.name} {item.age}
							</Text>
							<TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
								<Text>削除</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			</View>
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
		borderColor: '#000',
		borderWidth: 1,
	},
	list: {
		flex: 1,
	},
	renderItem: {
		width: '100%',
		height: 30,
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		marginVertical: 6,
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
});

export default SQLiteScreen;
