import { useState } from "react";

export interface UseMapReturn<K = any, V = any> {
	/**
	 * Should only be used when absolutely necessary.
	 */
	setState: React.Dispatch<React.SetStateAction<Map<K, V>>>;
	state: Map<K, V>;
	set(key: K, value: V): void;
	remove(key: K): void;
	clear(): void;
	reset(): void;
}

/**
 * Useful for using a state Map without mutating state.
 * @example const map = useMap();
 */
export function useMap<K = any, V = any>(initialState: Map<K, V> = new Map<K, V>()): UseMapReturn<K, V> {
	const [state, setState] = useState<Map<K, V>>(initialState);

	function set(key: K, value: V) {
		setState(state => {
			const newMap = new Map<K, V>(state);
			newMap.set(key, value);
			return newMap;
		});
	}

	function remove(key: K) {
		setState(state => {
			const newMap = new Map<K, V>(state);
			newMap.delete(key);
			return newMap;
		});
	}

	function clear() {
		setState(new Map<K, V>());
	}

	function reset() {
		setState(initialState);
	}

	return { state, set, remove, clear, setState, reset };
}
