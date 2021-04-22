import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { BackTile, IconButton } from '../components';

// const MenuItems = [
// 	{ text: 'Actions', isTitle: true, onPress: () => {} },
// 	{ text: 'Action 1', onPress: () => {} },
// 	{ text: 'Action 2', withSeperator: true, onPress: () => {} },
// 	{ text: 'Action 3', isDestructive: true, onPress: () => {} },
// ];

const HoldSampleScreen = () => {
	return (
		<BackTile colors={['#239', '#932']}>
			<View style={styles.container}>
				{/* <HoldItem items={MenuItems}>
				<View style={styles.item} />
        </HoldItem>
        <HoldItem items={MenuItems}>
				<View style={styles.item} />
        </HoldItem>
        <HoldItem items={MenuItems} menuAnchorPosition="bottom-right">
				<View style={styles.item} />
			</HoldItem> */}
				<View style={styles.plusButtonContainer}>
					<IconButton
						name="plus"
						color="#fff"
						size={24}
						buttonStyle={{ backgroundColor: '#000' }}
						onPressEvent={() => alert('click')}
					/>
				</View>
			</View>
		</BackTile>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		width: 100,
		height: 100,
		borderRadius: 8,
		backgroundColor: 'blue',
	},
	plusButtonContainer: {
		position: 'absolute',
		bottom: 32,
		right: 32,
	},
});

export default HoldSampleScreen;
