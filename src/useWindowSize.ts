import { useState } from "react";
import { useGlobalEvent } from "./useGlobalEvent";

export interface Size {
	width: number;
	height: number;
}

/**
 * Useful for separating mobile and desktop logic.
 * @example const { width, height } = useWindowsize();
 */
export function useWindowSize() {
	const [size, setSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight });
	useGlobalEvent("resize", () => setSize({ width: window.innerWidth, height: window.innerHeight }));
	return size;
}
