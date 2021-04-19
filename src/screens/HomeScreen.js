import React, { useState, useContext } from 'react';
import {
	SafeAreaView,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Text } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

import { useMedia } from '../hooks/useMedia';
import { BackTile } from '../components';

const HomeScreen = () => {
	const [albums, setAlbums] = useState([]);
	const [album, setAlbum] = useState({});
	const [assets, setAssets] = useState([]);
	const { permission } = useMedia();

	const getAlbums = async () => {
		const albums = await MediaLibrary.getAlbumsAsync({
			includeSmartAlbums: true,
		});
		setAlbums(albums || []);
	};

	const getAlbum = async (title) => {
		const album = await MediaLibrary.getAlbumAsync(title);
		const { assets } = await MediaLibrary.getAssetsAsync({ album });
		const list = await Promise.all(
			assets.map(async (asset) => {
				const manipResult = await ImageManipulator.manipulateAsync(asset.uri, [
					{ resize: { width: 200, height: 200 } },
				]);
				return manipResult;
			})
		);
		setAlbum(album || {});
		setAssets(list || []);
	};

	return (
		<BackTile style={styles.container} colors={['#8ec5fc', '#e0c3fc']}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.headerContainer}>
					<TouchableOpacity
						style={styles.touchButton}
						onPress={getAlbums}
						disabled={!permission}
					>
						<Text>Get Albums</Text>
					</TouchableOpacity>
					<Text>MediaLibrary : {permission.toString()}</Text>
					<Text>{albums.length}</Text>
				</View>
				<View style={styles.middleContainer}>
					<FlatList
						data={albums}
						renderItem={({ item }) => (
							<TouchableOpacity
								key={item.title}
								style={styles.item}
								onPress={() => getAlbum(item.title)}
							>
								<Text>{item.title}</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) => item.id}
					/>
				</View>
				<View style={styles.bottomContainer}>
					<FlatList
						data={assets}
						renderItem={({ item }) => (
							<View style={styles.assetItem}>
								<Image
									style={styles.image}
									source={{ uri: item.uri }}
									resizeMethod="resize"
									resizeMode="cover"
								/>
							</View>
						)}
						numColumns={2}
						keyExtractor={(item, index) => item.uri}
					/>
				</View>
			</SafeAreaView>
		</BackTile>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	headerContainer: {
		flex: 0.5,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',

		width: '100%',
	},
	middleContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	bottomContainer: {
		flex: 3,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 3,
	},
	touchButton: {
		width: 100,
		height: 50,
		backgroundColor: '#c81c0c',
		padding: 16,
		borderRadius: 8,
	},
	item: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
		height: 32,
		backgroundColor: '#424242',
		borderWidth: 0.5,
		borderBottomColor: '#000',
	},
	assetItem: {
		width: '48%',
		height: 200,
		margin: 3,
		borderRadius: 8,
		backgroundColor: '#eee',
		borderWidth: 0.3,
		borderColor: '#000',
	},
	image: {
		flex: 1,
		borderRadius: 8,
	},
});

export default HomeScreen;
