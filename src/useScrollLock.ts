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
 * @example const [isScrollable, setIsScrollable] = useScrollLock();
 */
export function useScrollLock() {
	const originalOverflow = useRef(document.body.style.overflow);
	const [isScrollable, setIsScrollable] = useState(isBodyScrollable());

	useEffect(() => {
		document.body.style.overflow = isScrollable ? originalOverflow.current : "hidden";
	}, [isScrollable]);

	useOnUnmount(() => {
		document.body.style.overflow = originalOverflow.current;
	});

	return [isScrollable, setIsScrollable] as const;
}
