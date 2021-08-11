import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
} from 'react-native';
import { Text, useTheme, TextInput } from 'react-native-paper';
import { BackTile } from '../components';
import { LineChart } from 'react-native-chart-kit';
import {
	KeyboardAccessoryNavigation,
	KeyboardAccessoryView,
} from 'react-native-keyboard-accessory';
import { useDebounce } from '../hooks/useDebounce';

const DebounceGraphScreen = () => {
	const { dark } = useTheme();
	const parentRef = React.createRef();

	const [currentText1, setCurrentText1] = useState(100);
	const [currentText2, setCurrentText2] = useState(200);
	const [currentText3, setCurrentText3] = useState(300);
	const [currentText4, setCurrentText4] = useState(400);
	const [currentText5, setCurrentText5] = useState(500);
	const [currentText6, setCurrentText6] = useState(600);
	const debounceText1 = useDebounce(currentText1, 1000);
	const debounceText2 = useDebounce(currentText2, 1000);
	const debounceText3 = useDebounce(currentText3, 1000);
	const debounceText4 = useDebounce(currentText4, 1000);
	const debounceText5 = useDebounce(currentText5, 1000);
	const debounceText6 = useDebounce(currentText6, 1000);

	const changeText = (text, no) => {
		if (no === 1) {
			setCurrentText1(text);
		} else if (no === 2) {
			setCurrentText2(text);
		} else if (no === 3) {
			setCurrentText3(text);
		} else if (no === 4) {
			setCurrentText4(text);
		} else if (no === 5) {
			setCurrentText5(text);
		} else if (no === 6) {
			setCurrentText6(text);
		}
	};

	useEffect(() => {
		// forwardRefのサンプル
		// console.log(parentRef.current.props.autoCapitalize);
	}, []);

	return (
		<>
			{/* <BackTile colors={['#135', '#219']}> */}
			<View style={styles.container}>
				<LineChart
					data={{
						labels: ['January', 'February', 'March', 'April', 'May', 'June'],
						datasets: [
							{
								data: [
									currentText1,
									currentText2,
									currentText3,
									currentText4,
									currentText5,
									currentText6,
								],
							},
						],
					}}
					width={Dimensions.get('window').width * 0.95} // from react-native
					height={300}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: '#121212',
						backgroundGradientFrom: 'blue',
						backgroundGradientTo: 'lightblue',
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: '4',
							strokeWidth: '1',
							stroke: '#000',
						},
					}}
					bezier
					style={{
						marginVertical: 8,
						marginBottom: 20,
						borderRadius: 4,
						padding: 2,
					}}
				/>
				<View style={styles.inputArea}>
					<TextInput
						type="outlined"
						style={styles.textInput}
						label="January"
						keyboardType="numeric"
						value={currentText1}
						onChangeText={(text) => changeText(text, 1)}
					/>
					<View>
						<Text>January</Text>
						<Text
							style={[styles.text, { borderColor: dark ? '#aaa' : '#000' }]}
						>
							{debounceText1}
						</Text>
					</View>
				</View>
				<View style={styles.inputArea}>
					<TextInput
						type="outlined"
						style={styles.textInput}
						label="February"
						keyboardType="numeric"
						value={currentText2}
						onChangeText={(text) => changeText(text, 2)}
					/>
					<View>
						<Text>February</Text>
						<Text
							style={[styles.text, { borderColor: dark ? '#aaa' : '#000' }]}
						>
							{debounceText2}
						</Text>
					</View>
				</View>
				<View style={styles.inputArea}>
					<TextInput
						type="outlined"
						style={styles.textInput}
						label="March"
						keyboardType="numeric"
						value={currentText3}
						onChangeText={(text) => changeText(text, 3)}
					/>
					<View>
						<Text>March</Text>
						<Text
							style={[styles.text, { borderColor: dark ? '#aaa' : '#000' }]}
						>
							{debounceText3}
						</Text>
					</View>
				</View>
				<View style={styles.inputArea}>
					<TextInput
						type="outlined"
						style={styles.textInput}
						label="April"
						keyboardType="numeric"
						value={currentText4}
						onChangeText={(text) => changeText(text, 4)}
					/>
					<View>
						<Text>April</Text>
						<Text
							style={[styles.text, { borderColor: dark ? '#aaa' : '#000' }]}
						>
							{debounceText4}
						</Text>
					</View>
				</View>
				<View style={styles.inputArea}>
					<TextInput
						type="outlined"
						style={styles.textInput}
						label="May"
						keyboardType="numeric"
						value={currentText5}
						onChangeText={(text) => changeText(text, 5)}
					/>
					<View>
						<Text>May</Text>
						<Text
							style={[styles.text, { borderColor: dark ? '#aaa' : '#000' }]}
						>
							{debounceText5}
						</Text>
					</View>
				</View>
				<View style={styles.inputArea}>
					<TextInput
						type="outlined"
						style={styles.textInput}
						label="June"
						// keyboardType="numeric"
						value={currentText6}
						onChangeText={(text) => changeText(text, 6)}
					/>
					<View>
						<Text>June</Text>
						<Text
							style={[styles.text, { borderColor: dark ? '#aaa' : '#000' }]}
						>
							{debounceText6}
						</Text>
					</View>
				</View>
			</View>
			{/* forwardRefのサンプル */}
			{/* <AppInput
					ref={parentRef}
					title="current text"
					value={currentText}
					onChangeText={changeText}
				/> */}
			{/* </BackTile> */}
			<KeyboardAccessoryNavigation
				doneButtonTitle="完了"
				nextHidden
				previousHidden
				androidAdjustResize
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop: 48,
	},
	inputArea: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		width: '90%',
		margin: 2,
	},
	textInput: {
		width: 200,
		marginHorizontal: 20,
		color: '#fff',
	},
	text: {
		width: 100,
		height: 40,
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderWidth: 1,
		marginVertical: 3,
	},
});
export default DebounceGraphScreen;
