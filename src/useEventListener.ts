import { useEffect, useRef } from "react";

/**
 * Useful for avoiding a lot of boilerplate code.
 * @example useEventListener(element, "click", clickHandler);
 */
export function useEventListener<T extends HTMLElement = HTMLDivElement>(
	event: keyof GlobalEventHandlersEventMap,
	callback: () => any
) {
	const callbackRef = useRef(callback);
	const elementRef = useRef<T>(null);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) {
			return;
		}
		const callback = callbackRef.current;
		element.addEventListener(event, callback);
		return () => {
			element.removeEventListener(event, callback);
		};
	}, [event, elementRef]);

	return elementRef;
}
