import { useEffect, useRef } from "react";

/**
 * Useful for running code only in the last render.
 * @example useOnUnmount(unsubscribe);
 */
export function useOnUnmount(callback: () => void) {
	const callbackRef = useRef(callback);
	useEffect(() => {
		return callbackRef.current;
	}, []);
}
