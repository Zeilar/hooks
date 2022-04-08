import { useEffect, useRef } from "react";

export type Element = HTMLElement | Window | Document;
export type Event = DocumentEventMap & WindowEventMap;

export function useEventListener(event: keyof Event, callback: () => any, element: Element = window) {
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
