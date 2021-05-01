import React, { useRef } from 'react';
import {
	Animated,
	Easing,
	TouchableOpacity,
	StyleSheet,
	InteractionManager,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const IconButton = ({
	name,
	color,
	size,
	buttonStyle,
	onPressEvent,
	...otherProps
}) => {
	const animationValue = useRef(new Animated.Value(0)).current;

	return (
		<TouchableOpacity
			style={[styles.button, { ...buttonStyle }]}
			{...otherProps}
			onPress={() => {
				animationValue.setValue(0);
				Animated.timing(animationValue, {
					toValue: 1,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: true,
				}).start();

				InteractionManager.runAfterInteractions(() => {
					onPressEvent();
				});
			}}
		>
			<AnimatedIcon
				{...{ name, color, size }}
				style={{
					transform: [
						{
							rotateZ: animationValue.interpolate({
								inputRange: [0, 1],
								outputRange: ['0deg', '360deg'],
								extrapolate: 'clamp',
							}),
						},
					],
				}}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: 'blue',
	},
});

export default IconButton;
