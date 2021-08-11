import React, { useCallback, memo, useMemo } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Alert,
	ScrollView,
	RefreshControl,
	useWindowDimensions,
} from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import HTML from 'react-native-render-html';
import Json from '../../microCMS.json';

const CardItem = memo(({ blog, width }) => {
	const { colors } = useTheme();
	return (
		<Card
			key={blog.id}
			style={{
				flex: 1,
				width: '95%',
				margin: 8,
				borderRadius: 8,
			}}
		>
			<Card.Cover
				style={{
					flex: 1,
					width: '100%',
					height: 200,
					resizeMode: 'stretch',
				}}
				source={{ uri: blog.mainVisual.url }}
			/>
			<Card.Title title={blog.title} />
			<Card.Content>
				<View style={{ alignItems: 'flex-end' }}>
					<Text style={{ fontSize: 16 }}>{blog.category.name}</Text>
					<Text style={{ fontSize: 12 }}>更新日：{blog.updateDate}</Text>
				</View>
				<HTML
					source={{ html: blog.body }}
					tagsStyles={{
						h3: { color: colors.text },
						span: { fontSize: 15 },
						p: { color: '#787878' },
						div: { color: '#787878' },
						img: {
							resizeMode: 'stretch',
							width: width * 0.8,
						},
					}}
					contentWidth={width}
				/>
			</Card.Content>
		</Card>
	);
});

const MicroCmsScreen = () => {
	const { width } = useWindowDimensions();
	const [blogs, setBlogs] = React.useState([]);
	const [refreshing, setRefreshing] = React.useState(false);

	const fetchData = useCallback(async () => {
		try {
			setRefreshing(true);
			const response = await fetch(Json['END-POINT'], {
				headers: {
					'X-API-KEY': Json['X-API-KEY'],
				},
			});
			const { contents } = await response.json();
			setBlogs(contents);
		} catch (error) {
			console.log({ error });
			Alert.alert(error);
		} finally {
			setRefreshing(false);
		}
	}, []);

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text style={{ textAlign: 'center' }}>microCMS　ブログ一覧</Text>
			<ScrollView
				style={{ flex: 1 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={fetchData} />
				}
				showsVerticalScrollIndicator={false}
			>
				{blogs.map((blog) => (
					<CardItem key={blog.id} {...{ blog, width }} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
	},
});

export default MicroCmsScreen;
