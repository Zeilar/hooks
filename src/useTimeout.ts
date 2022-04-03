import { useCallback, useEffect, useRef } from "react";

export interface UseTimeoutReturn {
	clear(): void;
	ref: number | undefined;
}

export function useTimeout(callback: () => void, delay: number): UseTimeoutReturn {
	const timeoutRef = useRef<number>();

	function clear() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	const start = useCallback(() => {
		return setTimeout(callback, delay);
	}, [callback, delay]);

	useEffect(() => clear, []);

	useEffect(() => {
		clear();
		start();
	}, [callback, start]);

	return { clear, ref: timeoutRef.current };
}
