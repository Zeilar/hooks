import { useEffect, useRef } from "react";

export function useOnMount(callback: () => void) {
	const callbackRef = useRef(callback);
	useEffect(() => {
		callbackRef.current();
	}, []);
}
