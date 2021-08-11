import React, { useEffect, useState, useRef } from 'react';

export const useDebounce = (value = 0, delay = 500) => {
	const [debounceText, setDebounceText] = useState(0);
	const timer = useRef(null);

	useEffect(() => {
		timer.current = setTimeout(() => {
			if (/\d/.test(value)) {
				setDebounceText(value);
			} else {
				setDebounceText(0);
			}
		}, delay);

		return () => {
			// 入力値が変わった場合にtimerをクリアしてstateに反映させない
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, [value, delay]);

	return debounceText;
};
