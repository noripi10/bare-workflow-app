import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import {
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
	Text,
} from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { useLocation } from '../hooks/useLocation';
import { MarkerCard } from '../components';

// Cardの分画面中央をずらす
const LAT_PLUS = -0.05;
const LNG_PLUS = 0.1;

const MapScreen = () => {
	const [DATA, setDATA] = useState([]);
	const [region, setRegion] = useState({
		latitude: 35.4095278,
		longitude: 136.7564656,
		latitudeDelta: 0.2,
		longitudeDelta: 0.2,
	});
	const [currentMarker, setCurrentMarker] = useState({
		latitude: 35.4095278,
		longitude: 136.7564656,
	});
	const [activeDot, setActiveDot] = useState(0);
	const isTate = useRef(true);
	const latPlus = isTate.current ? LAT_PLUS : 0;
	const lngPlus = !isTate.current ? LNG_PLUS : 0;

	// 画面向き関係
	const { width: WIDTH, height: HEIGHT } = useWindowDimensions();
	isTate.current = WIDTH < HEIGHT;
	const addCarouselContainer = isTate.current
		? { bottom: 16, width: '100%' }
		: { right: 16, width: '45%' };

	// テーマ関係
	const theme = useColorScheme();
	const isDarkTheme = theme === 'dark';

	//permission関係
	const { permission, getGeoLocation } = useLocation();

	const snapChangeHandler = useCallback(
		(index) => {
			const newLatLng = DATA[index].latLng;

			const newRegion = {
				...region,
				latitude: newLatLng.latitude + latPlus, //上に少しずらす
				longitude: newLatLng.longitude + lngPlus,
			};
			setRegion(newRegion);
			setCurrentMarker(newLatLng);
			setActiveDot(index);
		},
		[DATA]
	);

	useEffect(() => {
		if (DATA && DATA.length) {
			const latLng = DATA[0].latLng;

			setRegion({
				latitude: latLng.latitude + latPlus,
				longitude: latLng.longitude + lngPlus,
				latitudeDelta: 0.2,
				longitudeDelta: 0.2,
			});

			setCurrentMarker({
				latitude: latLng.latitude,
				longitude: latLng.longitude,
			});
		}
	}, [DATA]);

	useEffect(() => {
		setDATA(sampleDATA);
	}, []);

	useEffect(() => {
		const func = async () => {
			const result = await getGeoLocation();

			const {
				coords: { latitude, longitude },
			} = result;

			// console.log(result);
		};

		if (permission) {
			func();
		}
	}, [permission]);

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				customMapStyle={isDarkTheme ? mapDarkStyle : mapStandardStyle}
				region={region}
				// onRegionChange={(newRegion) => {
				// 	// console.log({ newRegion });
				// 	setRegion(newRegion);
				// }}
			>
				<Marker
					coordinate={currentMarker}
					// title={marker.title}
					// description={marker.description}
				/>
			</MapView>
			{DATA && (
				<View style={[styles.carouselContainer, { ...addCarouselContainer }]}>
					<Carousel
						data={DATA}
						renderItem={({ item, index }) => (
							<MarkerCard {...{ item, index }} />
						)}
						sliderWidth={isTate.current ? WIDTH : WIDTH * 0.5}
						itemWidth={isTate.current ? WIDTH * 0.8 : HEIGHT * 0.7}
						onSnapToItem={snapChangeHandler}
						zoomScale={0.7}
					/>
					<Pagination
						dotsLength={DATA.length}
						containerStyle={styles.paginationContainer}
						dotStyle={styles.activeDot}
						inactiveDotStyle={styles.inactiveDot}
						activeDotIndex={activeDot}
						inactiveDotOpacity={0.4}
						inactiveDotScale={0.6}
					/>
				</View>
			)}
			<Button
				mode="contained"
				uppercase={false}
				style={{ position: 'absolute', top: 40, right: 12 }}
				onPress={() => getGeoLocation()}
			>
				getGeoLocation
			</Button>
			<StatusBar style="dark" />
		</View>
	);
};

const sampleDATA = [
	{
		id: 1,
		tile: 'title1',
		destination: 'destination1',
		latLng: { latitude: 35.4095278, longitude: 136.7564656 },
	},
	{
		id: 2,
		tile: 'title2',
		destination: 'destination2',
		latLng: { latitude: 35.5095278, longitude: 135.7564656 },
	},
	{
		id: 3,
		tile: 'title3',
		destination: 'destination3',
		latLng: { latitude: 35.6095278, longitude: 138.7564656 },
	},
	{
		id: 4,
		tile: 'title4',
		destination: 'destination4',
		latLng: { latitude: 35.7095278, longitude: 126.7564656 },
	},
	{
		id: 5,
		tile: 'title5',
		destination: 'destination5',
		latLng: { latitude: 35.8095278, longitude: 136.7564656 },
	},
	{
		id: 11,
		tile: 'title1',
		destination: 'destination1',
		latLng: { latitude: 35.4095278, longitude: 136.7564656 },
	},
	{
		id: 12,
		tile: 'title2',
		destination: 'destination2',
		latLng: { latitude: 35.5095278, longitude: 135.7564656 },
	},
	{
		id: 13,
		tile: 'title3',
		destination: 'destination3',
		latLng: { latitude: 35.6095278, longitude: 138.7564656 },
	},
	{
		id: 14,
		tile: 'title4',
		destination: 'destination4',
		latLng: { latitude: 35.7095278, longitude: 126.7564656 },
	},
	{
		id: 15,
		tile: 'title5',
		destination: 'destination5',
		latLng: { latitude: 35.8095278, longitude: 136.7564656 },
	},
];

const mapDarkStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#242f3e',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#746855',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#242f3e',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#263c3f',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#6b9a76',
			},
		],
	},
	{
		featureType: 'poi.school',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: '#38414e',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#212a37',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9ca5b3',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#746855',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#1f2835',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'labels',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#f3d19c',
			},
		],
	},
	{
		featureType: 'road.local',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'geometry',
		stylers: [
			{
				color: '#2f3948',
			},
		],
	},
	{
		featureType: 'transit.station',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#d59563',
			},
		],
	},
	{
		featureType: 'water',
		stylers: [
			{
				color: '#673dff',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#17263c',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#515c6d',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#17263c',
			},
		],
	},
];

const mapStandardStyle = [
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	carouselContainer: {
		position: 'absolute',
		// justifyContent: 'center',
		// alignItems: 'center',
	},
	paginationContainer: {
		width: '100%',
		marginVertical: 4,
		paddingVertical: 4,
		// backgroundColor: 'rgba(0,0,0,0.75)',
	},
	activeDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 3,
		backgroundColor: 'rgba(0,0,255,1)',
		marginHorizontal: 1,
	},
	inactiveDot: {
		backgroundColor: 'rgba(255,0,0,0.5)',
	},
});

export default MapScreen;
