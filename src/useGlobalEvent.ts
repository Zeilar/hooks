import { useEffect, useRef } from "react";

/**
 * Useful for avoiding a lot of boilerplate code.
 * @example useGlobalEvent("click", clickHandler);
 */
export function useGlobalEvent<K extends keyof WindowEventMap>(
	event: K,
	callback: (this: Window, event: WindowEventMap[K]) => any
) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const callback = callbackRef.current;
		window.addEventListener(event, callback);
		return () => {
			window.removeEventListener(event, callback);
		};
	}, [event]);
}
