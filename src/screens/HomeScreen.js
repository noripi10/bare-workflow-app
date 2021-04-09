import React, { useState, useContext } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

import { Constants } from 'react-native-unimodules';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

import { AppContext } from '../provider/AppProvider';
import { useMediaPermission } from '../hooks/useMediaPermission';

const HomeScreen = () => {
	const { pushToken } = useContext(AppContext);
	const [albums, setAlbums] = useState([]);
	const [album, setAlbum] = useState({});
	const [assets, setAssets] = useState([]);
	const { result } = useMediaPermission();

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
				const manipResult = await ImageManipulator.manipulateAsync(asset.uri);
				return manipResult;
			})
		);
		setAlbum(album || {});
		setAssets(list || []);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Text>{Constants.isDevice ? 'Real Device' : 'Not Real Device'}</Text>
				<Text>{Constants.isDevice && pushToken}</Text>
				<Text>MediaLibrary : {result.toString()}</Text>
				<TouchableOpacity
					style={styles.touchButton}
					onPress={getAlbums}
					disabled={!result}
				>
					<Text>Get Albums</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.middleContainer}>
				<Text>{albums.length}</Text>
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		marginTop: 35,
	},
	headerContainer: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
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
		backgroundColor: '#ddd',
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
