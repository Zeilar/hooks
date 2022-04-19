import { useState } from "react";

export type AnyObject = Record<any, any>;

export interface UseObjectReturn<T = AnyObject> {
	/**
	 * Should only be used when absolutely necessary.
	 */
	setState: React.Dispatch<React.SetStateAction<T>>;
	state: T;
	set(key: keyof T, value: any): void;
	remove(key: keyof T): void;
	empty(): void;
	reset(): void;
}

/**
 * Useful for operations that require mutating the state object.
 * @example const object = useObject<Record<any, any>>();
 */
export function useObject<T = AnyObject>(initialState: T = {} as T): UseObjectReturn<T> {
	const [state, setState] = useState(initialState);

	function set(key: keyof T, value: any) {
		setState(state => ({ ...state, [key]: value }));
	}

	function remove(key: keyof T) {
		setState(state => {
			const obj = { ...state };
			delete obj[key];
			return obj;
		});
	}

	/**
	 * Keep in mind using this may cause bugs as state is no longer of type T.
	 */
	function empty() {
		setState({} as T);
	}

	function reset() {
		setState(initialState);
	}

	return { state, set, remove, empty, setState, reset };
}
