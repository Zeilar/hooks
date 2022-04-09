import { useState } from "react";
import { useGlobalEvent } from "./useGlobalEvent";

export interface Size {
	x: number;
	y: number;
}

/**
 * Useful for separating mobile and desktop logic.
 * @example const { x, y } = useWindowsize();
 */
export function useWindowSize() {
	const [size, setSize] = useState<Size>({ x: window.innerWidth, y: window.innerHeight });
	useGlobalEvent("resize", () => setSize({ x: window.innerWidth, y: window.innerHeight }));
	return size;
}
