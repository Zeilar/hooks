import { useEffect, useRef } from "react";

export type Element = HTMLElement | Window | Document;

export function useEventListener(event: string, callback: () => {}, element: Element = window) {
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
