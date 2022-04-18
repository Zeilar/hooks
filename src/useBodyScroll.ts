import { useEffect, useRef, useState } from "react";
import { useOnUnmount } from "./useOnUnmount";

/**
 * Useful for removing page scrolling, e.g when a modal is open.
 * @example const [hasScroll, setHasScroll] = useTheme("dark");
 */
export function useBodyScroll() {
	const originalOverflow = useRef(document.body.style.overflowY);
	const [hasScroll, setHasScroll] = useState(originalOverflow.current);

	useEffect(() => {
		document.body.style.overflowY = hasScroll ? originalOverflow.current : "hidden";
	}, [hasScroll]);

	useOnUnmount(() => {
		document.body.style.overflowY = originalOverflow.current;
	});

	return [hasScroll, setHasScroll] as const;
}
