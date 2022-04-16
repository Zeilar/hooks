import { useOnUnmount } from "@zeilar/hooks";
import { useCallback, useEffect, useRef } from "react";

export interface UseTimeoutReturn {
	clear(): void;
	ref: number | undefined;
}

/**
 * Useful for any delay related logic. Delay is in milliseconds.
 * @example const { clear, ref } = useTimeout(firePopup, 5000);
 */
export function useTimeout(callback: () => void, delay: number): UseTimeoutReturn {
	const timeoutRef = useRef<number>();

	function clear() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	const start = useCallback(() => {
		setTimeout(callback, delay);
	}, [callback, delay]);

	useEffect(() => {
		clear();
		start();
	}, [callback, start]);

	useOnUnmount(clear);

	return { clear, ref: timeoutRef.current };
}
