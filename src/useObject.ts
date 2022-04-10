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
}

/**
 * Useful for operations that require mutating the state object.
 * @example const { state, set, remove, empty } = useObject<Record<any, any>>();
 */
export function useObject<T = AnyObject>(defaultValue: T = {} as T): UseObjectReturn<T> {
	const [state, setState] = useState(defaultValue);

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

	function empty() {
		setState({} as T);
	}

	return { state, set, remove, empty, setState };
}
