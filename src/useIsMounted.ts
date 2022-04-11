import { useCallback, useRef } from "react";
import { useOnUnmount } from "./useOnUnmount";
import { useOnMount } from "./useOnMount";

export function useIsMounted() {
	const isMounted = useRef(false);
	useOnMount(() => {
		isMounted.current = true;
	});
	useOnUnmount(() => {
		isMounted.current = false;
	});
	return useCallback(() => isMounted.current, []);
}
