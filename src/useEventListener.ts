import { useEffect, useRef } from "react";

/**
 * Useful for avoiding a lot of boilerplate code.
 * @example useEventListener(element, "click", clickHandler);
 */
export function useEventListener(element: Element, event: keyof GlobalEventHandlersEventMap, callback: () => any) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const callback = callbackRef.current;
		element.addEventListener(event, callback);
		return () => {
			element.removeEventListener(event, callback);
		};
	}, [event, element]);
}
