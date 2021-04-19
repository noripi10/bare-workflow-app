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

// Cardの分画面中央をずらす
const LAT_PLUS = -0.05;
const LNG_PLUS = 0.1;

const LeftContent = (props) => <Avatar.Icon {...props} icon="map-marker" />;

const MyComponent = (item, index) => (
	<Card style={[styles.card]}>
		<Card.Title
			title="Card Title"
			subtitle="Card Subtitle"
			left={LeftContent}
		/>
		{/* <Card.Content>
			<Title>Card title</Title>
			<Paragraph>Card content</Paragraph>
		</Card.Content> */}
		<Card.Cover
			source={{ uri: 'https://picsum.photos/700' }}
			resizeMethod="auto"
			resizeMode="cover"
			style={{ width: '100%', height: 165 }}
		/>
		<Card.Actions style={{ justifyContent: 'flex-end' }}>
			<Button>Cancel</Button>
			<Button>Ok</Button>
		</Card.Actions>
	</Card>
);

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
	const addCarouselContainer = isTate.current ? { bottom: 16 } : { right: 16 };

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

			console.log(result);
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
				customMapStyle={isDarkTheme ? mapStandardStyle : mapStandardStyle}
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
						renderItem={({ item, index }) => MyComponent(item, index)}
						sliderWidth={isTate.current ? WIDTH : HEIGHT * 0.8}
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
				color: '#212121',
			},
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#212121',
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#9e9e9e',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#bdbdbd',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#181818',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#616161',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#1b1b1b',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#2c2c2c',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#8a8a8a',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#373737',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#3c3c3c',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#4e4e4e',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#616161',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#757575',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#000000',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#3d3d3d',
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
		bottom: 16,
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
		marginHorizontal: 0,
		backgroundColor: 'rgba(0,0,0,0.92)',
		marginHorizontal: 1,
	},
	inactiveDot: {
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
});

export default MapScreen;
