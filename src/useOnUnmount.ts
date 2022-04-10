import { useEffect, useRef } from "react";

export function useOnUnmount(callback: () => void) {
	const callbackRef = useRef(callback);
	useEffect(() => {
		return callbackRef.current;
	}, []);
}
