import { useEffect, useRef, useState } from "react";

export interface UseHoverReturn<T extends HTMLElement = HTMLDivElement> {
	ref: React.RefObject<T>;
	hovered: boolean;
}

export function useHover<T extends HTMLElement = HTMLDivElement>(): UseHoverReturn<T> {
	const [hovered, setHovered] = useState(false);
	const ref = useRef<T>(null);

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		function onMouseEnter() {
			setHovered(true);
		}

		function onMouseLeave() {
			setHovered(false);
		}

		element.addEventListener("mouseenter", onMouseEnter);
		element.addEventListener("mouseleave", onMouseLeave);

		return () => {
			element.removeEventListener("mouseenter", onMouseEnter);
			element.removeEventListener("mouseleave", onMouseLeave);
		};
	}, []);

	return { ref, hovered };
}
