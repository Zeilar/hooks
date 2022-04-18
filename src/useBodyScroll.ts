import { useEffect, useRef, useState } from "react";
import { useOnUnmount } from "./useOnUnmount";

export function isBodyScrollable() {
	switch (getComputedStyle(document.body).overflow) {
		case "auto":
		case "visible":
			return true;
		case "hidden":
			return false;
		default:
			return true;
	}
}

/**
 * Useful for removing page scrolling, e.g when a modal is open. Keep in mind this only checks overflow.
 * @example const [hasScroll, setHasScroll] = useBodyScroll();
 */
export function useBodyScroll() {
	const originalOverflow = useRef(document.body.style.overflow);
	const [hasScroll, setHasScroll] = useState(isBodyScrollable());

	useEffect(() => {
		document.body.style.overflow = hasScroll ? originalOverflow.current : "hidden";
	}, [hasScroll]);

	useOnUnmount(() => {
		document.body.style.overflow = originalOverflow.current;
	});

	return [hasScroll, setHasScroll] as const;
}
