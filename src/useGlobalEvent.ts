import { useEffect, useRef } from "react";

export type Element = HTMLElement | Window | Document;
export type GlobalEvent = DocumentEventMap & WindowEventMap;

/**
 * Useful for avoiding a lot of boilerplate code.
 * @example useGlobalEvent("click", clickHandler);
 */
export function useGlobalEvent(event: keyof GlobalEvent, callback: (event: Event) => any, element: Element = window) {
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
