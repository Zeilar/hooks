import { useState } from "react";
import { useGlobalEvent } from "./useGlobalEvent";

/**
 * Useful for real-time communication apps using e.g websockets.
 * @example const isOnline = useIsOnline();
 */
export function useIsOnline() {
	const isSupported = typeof window !== "undefined" && "ononline" in window;
	const [isOnline, setIsOnline] = useState(isSupported ? navigator.onLine : true);

	useGlobalEvent("online", () => setIsOnline(true));
	useGlobalEvent("offline", () => setIsOnline(false));

	if (!isSupported) {
		console.warn("This device does not support the useIsOnline hook.");
		return isOnline;
	}

	return isOnline;
}
