import { useEffect, useRef, useState } from "react";
import { useOnUnmount } from "./useOnUnmount";

export function isBodyScrollable() {
	const bodyOverflowStyle = getComputedStyle(document.body).overflowY;
	return bodyOverflowStyle === "auto" || bodyOverflowStyle === "visible";
}

/**
 * Useful for removing page scrolling, e.g when a modal is open. Keep in mind this only checks overflowY.
 * @example const [hasScroll, setHasScroll] = useTheme("dark");
 */
export function useBodyScroll() {
	const originalOverflow = useRef(document.body.style.overflowY);
	const [hasScroll, setHasScroll] = useState(isBodyScrollable());

	useEffect(() => {
		document.body.style.overflowY = hasScroll ? originalOverflow.current : "hidden";
	}, [hasScroll]);

	useOnUnmount(() => {
		document.body.style.overflowY = originalOverflow.current;
	});

	return [hasScroll, setHasScroll] as const;
}
