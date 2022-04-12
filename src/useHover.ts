import { useEffect, useRef, useState } from "react";

export interface UseHoverReturn<T extends HTMLElement = HTMLDivElement> {
	ref: React.RefObject<T>;
	hovered: boolean;
}

/**
 * Useful for hover logic that may not be easy, or even doable in CSS.
 * @example const isHovered = useHover();
 */
export function useHover<T extends HTMLElement = HTMLDivElement>(): UseHoverReturn<T> {
	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef<T>(null);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		function onMouseEnter() {
			setIsHovered(true);
		}

		function onMouseLeave() {
			setIsHovered(false);
		}

		element.addEventListener("mouseenter", onMouseEnter);
		element.addEventListener("mouseleave", onMouseLeave);

		return () => {
			element.removeEventListener("mouseenter", onMouseEnter);
			element.removeEventListener("mouseleave", onMouseLeave);
		};
	}, []);

	return { ref, hovered: isHovered };
}
