import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { BackTile, AppInput } from '../components';
import { useDebounce } from '../hooks/useDebounce';

const DebounceScreen = () => {
	const [currentText, setCurrentText] = useState('');
	const debounceText = useDebounce(currentText, 1000);
	const { dark } = useTheme();
	const parentRef = React.createRef();

	const changeText = (text) => {
		setCurrentText(text);
	};

	useEffect(() => {
		console.log(parentRef.current.props.autoCapitalize);
	}, []);

	return (
		<BackTile colors={['#135', '#219']}>
			<View style={styles.container}>
				<AppInput
					ref={parentRef}
					title="current text"
					value={currentText}
					onChangeText={changeText}
				/>
				<View>
					<Text>debounce text</Text>
					<Text style={[styles.text, { borderColor: dark ? '#aaa' : '#f000' }]}>
						{debounceText}
					</Text>
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
	text: {
		width: 250,
		height: 35,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderWidth: 1,
		marginVertical: 3,
	},
});
export default DebounceScreen;
