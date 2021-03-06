import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
	const [permission, setPermission] = useState(null);

	const getGeoLocation = async () => {
		try {
			const { status } = await Location.getPermissionsAsync();
			if (status !== 'granted') {
				throw '位置情報取得設定がされていません';
			}

			const result = await Location.getCurrentPositionAsync();
			// console.log(result);

			return result;
		} catch (err) {
			alert(err);
			// console.log(err);
		}
	};

	useEffect(() => {
		const permissionFunc = async () => {
			const { status: getStatus } = await Location.getPermissionsAsync();
			if (getStatus === 'granted') {
				setPermission(true);
			} else {
				const {
					status: askPermission,
				} = await Location.requestPermissionsAsync();
				if (askPermission === 'granted') {
					setPermission(true);
				} else {
					setPermission(false);
				}
			}
		};

		permissionFunc();
	}, []);
	return { permission, getGeoLocation };
};
