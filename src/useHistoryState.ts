import { useState } from "react";
import { useArray } from "./useArray";

export interface UseHistoryStateReturn<T = any> {
	/**
	 * Should only be used when absolutely necessary.
	 */
	setHistory: React.Dispatch<React.SetStateAction<T[]>>;
	state: T;
	history: T[];
	historyIndex: number;
	push(...items: T[]): void;
	forward(): void;
	back(): void;
	go(index: number): void;
	remove(index: number): void;
	oldest(): void;
	newest(): void;
	clear(): void;
	hasNext: boolean;
	hasPrevious: boolean;
}

/**
 * Useful if you want a state that saves previous values, where you can go back and forth.
 * @example const formProgress = useHistoryState<FormStep>(firstStep);
 */
export function useHistoryState<T = any>(defaultValue?: T): UseHistoryStateReturn<T> {
	const history = useArray<T>(defaultValue ? [defaultValue] : []);
	const [historyIndex, setHistoryIndex] = useState(0);

	function hasIndex(index: number) {
		return index in history.state;
	}

	const hasPrevious = hasIndex(historyIndex - 1);
	const hasNext = hasIndex(historyIndex + 1);

	function push(...items: T[]) {
		if (items.length > 0) {
			history.push(...items);
			setHistoryIndex(history.state.length - 1 + items.length); // A little unsafe but most practical solution I could think of
		}
	}

	function newest() {
		const index = history.state.length - 1;
		go(index);
	}

	function forward() {
		if (hasNext) {
			setHistoryIndex(p => p + 1);
		}
	}

	function back() {
		if (hasPrevious) {
			setHistoryIndex(p => p - 1);
		}
	}

	function go(index: number) {
		if (hasIndex(index)) {
			setHistoryIndex(index);
		}
	}

	function oldest() {
		setHistoryIndex(0);
	}

	function clear() {
		setHistoryIndex(0);
		history.empty();
	}

	return {
		state: history.state[historyIndex],
		history: history.state,
		setHistory: history.setState,
		remove: history.remove,
		push,
		historyIndex,
		forward,
		back,
		go,
		oldest,
		newest,
		hasNext,
		hasPrevious,
		clear
	};
}
