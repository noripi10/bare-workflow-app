import React from 'react';
import { Avatar, Card, Button } from 'react-native-paper';

const LeftContent = (props) => <Avatar.Icon {...props} icon="map-marker" />;

const MarkerCard = ({ item, index }) => {
	return (
		<Card>
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
				<Button onPress={() => alert(index)}>Ok</Button>
			</Card.Actions>
		</Card>
	);
};

export default MarkerCard;
