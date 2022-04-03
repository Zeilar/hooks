import { useState } from "react";

export interface UseArrayReturn<T = any> {
	state: T[];
	push(element: T): void;
	filter(callback: (value: T, index: number, array: T[]) => boolean): void;
	remove(index: number): void;
	empty(): void;
}

export function useArray<T = any>(defaultValue?: T[]): UseArrayReturn<T> {
	const [state, setState] = useState(defaultValue ?? []);

	function push(element: T) {
		setState(state => [...state, element]);
	}

	function filter(callback: (value: T, index: number, array: T[]) => boolean) {
		setState(state => state.filter(callback));
	}

	function remove(index: number) {
		filter((_, i) => i !== index);
	}

	function empty() {
		setState([]);
	}

	return { state, push, filter, remove, empty };
}
