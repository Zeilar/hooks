import { useState } from "react";
import { useEventListener } from "./useEventListener";

export function useIsOnline() {
	const isSupported = typeof window !== "undefined" && "ononline" in window;
	const [isOnline, setIsOnline] = useState(isSupported ? navigator.onLine : true);

	useEventListener("online", () => setIsOnline(true));
	useEventListener("offline", () => setIsOnline(false));

	if (!isSupported) {
		console.warn("This device does not support the useIsOnline hook.");
		return isOnline;
	}

	return isOnline;
}
