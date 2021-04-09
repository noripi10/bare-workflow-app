import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export const useMediaPermission = () => {
	const [result, setResult] = useState(false);

	useEffect(() => {
		const permissionFunc = async () => {
			let confirm = false;
			const { status } = await MediaLibrary.getPermissionsAsync();
			if (status === MediaLibrary.PermissionStatus.GRANTED) {
				confirm = true;
			} else {
				const {
					status: askStatus,
				} = await MediaLibrary.requestPermissionsAsync();
				if (askStatus === MediaLibrary.PermissionStatus.GRANTED) {
					confirm = true;
				}
			}
			setResult(confirm);
		};
		permissionFunc();
	}, []);

	return { result };
};
