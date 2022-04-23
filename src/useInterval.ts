import { useOnUnmount } from "./useOnUnmount";
import { useCallback, useEffect, useRef } from "react";

export interface UseIntervalReturn {
	clear(): void;
	ref: number | undefined;
}

/**
 * Useful for any repeated logic. Delay is in milliseconds.
 * @example const { clear, ref } = useInterval(firePopup, 5000);
 */
export function useInterval(callback: () => void, interval: number): UseIntervalReturn {
	const intervalRef = useRef<number>();

	function clear() {
		clearInterval(intervalRef.current);
	}

	const start = useCallback(() => {
		const intervalId = window.setInterval(callback, interval);
		intervalRef.current = intervalId;
	}, [callback, interval]);

	useEffect(() => {
		clear();
		start();
	}, [callback, start]);

	useOnUnmount(clear);

	return { clear, ref: intervalRef.current };
}
