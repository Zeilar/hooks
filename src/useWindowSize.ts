import { useState } from "react";
import { useGlobalEvent } from "./useGlobalEvent";

export interface Size {
	x: number;
	y: number;
}

export function useWindowSize() {
	const [size, setSize] = useState<Size>({ x: window.innerWidth, y: window.innerHeight });
	useGlobalEvent("resize", () => setSize({ x: window.innerWidth, y: window.innerHeight }));
	return size;
}
