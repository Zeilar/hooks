import { useEffect, useState } from "react";

export interface UseAsyncReturn<T = any, E = any> {
	loading: boolean;
	error: E | undefined;
	result: T | undefined;
}

/**
 * Useful for resolving promises with states.
 * const { result, loading, error } = useAsync(promise);
 */
export function useAsync<T = any, E = any>(
	promise: Promise<T> | (() => Promise<T>),
	initialValue?: T
): UseAsyncReturn<T, E> {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState<T | undefined>(initialValue);
	const [error, setError] = useState<E | undefined>();

	useEffect(() => {
		setLoading(true);
		const resolvedPromise = typeof promise === "function" ? promise() : promise;
		resolvedPromise
			.then(setResult)
			.catch(setError)
			.finally(() => setLoading(false));
		return () => {
			setResult(undefined);
			setError(undefined);
			setLoading(true);
		};
	}, [promise]);

	return { loading, result, error };
}
