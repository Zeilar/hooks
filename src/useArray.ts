import { useState } from "react";

export interface UseArrayReturn<T = any> {
	/**
	 * Should only be used when absolutely necessary.
	 */
	setState: React.Dispatch<React.SetStateAction<T[]>>;
	state: T[];
	push(...items: T[]): void;
	filter(callback: (value: T, index: number, array: T[]) => boolean): void;
	remove(index: number): void;
	empty(): void;
	sort(compareFn: (a: T, b: T) => number): void;
	pop(): void;
	reverse(): void;
	shift(): void;
	unshift(...items: T[]): void;
	fill(value: T, start?: number | undefined, end?: number | undefined): void;
	reset(): void;
}

/**
 * Useful for state arrays where you want to use mutational functions.
 * @example const array = useArray<number>([1, 2, 3]);
 */
export function useArray<T = any>(initialState: T[] | (() => T[]) = []): UseArrayReturn<T> {
	const [state, setState] = useState(initialState);

	function push(...items: T[]) {
		setState(state => [...state, ...items]);
	}

	function pop() {
		setState(state => {
			const copy = [...state];
			copy.pop();
			return copy;
		});
	}

	function shift() {
		setState(state => {
			const copy = [...state];
			copy.shift();
			return copy;
		});
	}

	function unshift(...items: T[]) {
		setState(state => {
			const copy = [...state];
			copy.unshift(...items);
			return copy;
		});
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

	function sort(compareFn: (a: T, b: T) => number) {
		setState(state => {
			const copy = [...state];
			return copy.sort(compareFn);
		});
	}

	function reverse() {
		setState(state => {
			const copy = [...state];
			return copy.reverse();
		});
	}

	function fill(value: T, start?: number, end?: number) {
		setState(state => {
			const copy = [...state];
			return copy.fill(value, start, end);
		});
	}

	function reset() {
		setState(initialState);
	}

	return { state, push, filter, remove, empty, sort, pop, reverse, shift, unshift, fill, setState, reset };
}
