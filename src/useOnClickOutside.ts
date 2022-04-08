import { useEffect, useRef } from "react";

export interface Options {
	mouseup?: boolean;
}

/**
 * Useful for closing menu when clicking outside.
 * @example const ref = useOnClickOutside(close);
 */
export function useOnClickOutside<T extends HTMLElement = HTMLDivElement>(callback: () => void, options: Options = {}) {
	const ref = useRef<T>(null);
	const { mouseup } = options;
	const event = mouseup ? "mouseup" : "mousedown";

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		function clickHandler(e: MouseEvent) {
			try {
				if (!element) {
					console.warn("Ref is not assigned to an element.");
					return;
				}
				if (!element.contains(e.target as Node)) {
					callback();
				}
			} catch (error) {
				console.error(error);
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, event]);

	return ref;
}
