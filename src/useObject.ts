import { useState } from "react";

export type AnyObject = Record<any, any>;

export interface UseObjectReturn<T = AnyObject> {
	state: T;
	set(key: keyof T, value: any): void;
	remove(key: keyof T): void;
	empty(): void;
}

export function useObject<T = AnyObject>(defaultValue?: T): UseObjectReturn<T> {
	const [state, setState] = useState(defaultValue ?? ({} as T));

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

	return { state, set, remove, empty };
}
