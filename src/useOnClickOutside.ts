import { useEffect, useRef } from "react";

export interface Options {
	mouseup?: boolean;
	rightClick?: boolean;
}

/**
 * Useful for closing menus when clicking outside.
 * @example const ref = useOnClickOutside(close);
 */
export function useOnClickOutside<T extends HTMLElement = HTMLDivElement>(callback: () => void, options: Options = {}) {
	const ref = useRef<T>(null);
	const { mouseup, rightClick } = options;
	const event = mouseup ? "mouseup" : "mousedown";

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		function clickHandler(e: MouseEvent) {
			if (!element) {
				console.warn("Ref is not assigned to an element.");
				return;
			}
			if (rightClick === false && e.button === 3) {
				return;
			}
			if (!element.contains(e.target as Node)) {
				callback();
			}
		}

		document.addEventListener(event, clickHandler);

		return () => {
			document.removeEventListener(event, clickHandler);
		};
	}, [callback, event, rightClick]);

	return ref;
}
