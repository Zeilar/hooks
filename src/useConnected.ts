import { useState } from "react";
import { useEventListener } from "./useEventListener";

export function useConnected() {
	const isSupported = typeof window !== "undefined" && "ononline" in window;
	const [isOnline, setIsOnline] = useState(isSupported ? navigator.onLine : true);

	useEventListener("online", () => setIsOnline(true));
	useEventListener("offline", () => setIsOnline(false));

	if (!isSupported) {
		console.warn("This device does not support the useConnected hook.");
		return isOnline;
	}

	return isOnline;
}
