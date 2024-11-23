import { useEffect, useState, useRef } from "react";

export const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const timerRef = useRef("");
	useEffect(() => {
		timerRef.curent = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerRef.curent);
		};
	}, [value, delay]);
	return debouncedValue;
};
