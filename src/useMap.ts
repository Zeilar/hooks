import { useState } from "react";

export interface UseMapReturn<K, V> {
	/**
	 * Should only be used when absolutely necessary.
	 */
	setState: React.Dispatch<React.SetStateAction<Map<K, V>>>;
	state: Map<K, V>;
	set(key: K, value: V): void;
	remove(key: K): void;
	clear(): void;
}

/**
 * Useful for using a state Map without mutating state.
 * @example const map = useMap();
 */
export function useMap<K, V>(initial?: Map<K, V>): UseMapReturn<K, V> {
	const [state, setState] = useState<Map<K, V>>(initial ?? new Map<K, V>());

	function set(key: K, value: V) {
		setState(p => {
			const newMap = new Map<K, V>(p);
			newMap.set(key, value);
			return newMap;
		});
	}

	function remove(key: K) {
		setState(p => {
			const newMap = new Map<K, V>(p);
			newMap.delete(key);
			return newMap;
		});
	}

	function clear() {
		setState(new Map<K, V>());
	}

	return { state, set, remove, clear, setState };
}
