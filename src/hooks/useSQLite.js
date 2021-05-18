import React, { useEffect, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

export const useSQLite = (name) => {
	const db = SQLite.openDatabase(name);

	const executeSqlAsync = useCallback(async (sql, param) => {
		const response = await new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					sql,
					param,
					(t, resultSet) => {
						resolve(resultSet);
					},
					(_, error) => {
						reject({ error });
					}
				);
			});
		});

		return response;
	}, []);

	const closeDatabase = () => {
		db.close();
	};

	return { db, executeSqlAsync, closeDatabase };
};
