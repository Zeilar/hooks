import { useEffect, useRef } from "react";

/**
 * Useful for running code only in the first render.
 * @example useOnMount(subscribe);
 */
export function useOnMount(callback: () => void) {
	const callbackRef = useRef(callback);
	useEffect(() => {
		callbackRef.current();
	}, []);
}
