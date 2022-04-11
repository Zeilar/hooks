import { useEffect, useState } from "react";

export interface UseAsyncReturn<T = any, E = any> {
	loading: boolean;
	error: E;
	result: T | undefined;
}

export function useAsync<T = any, E = any>(
	promise: Promise<T> | (() => Promise<T>),
	initialValue?: T
): UseAsyncReturn<T> {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState<T | undefined>(initialValue);
	const [error, setError] = useState<E>();

	useEffect(() => {
		setLoading(true);
		const resolvedPromise = typeof promise === "function" ? promise() : promise;
		resolvedPromise
			.then(setResult)
			.catch(setError)
			.finally(() => setLoading(false));
	}, [promise]);

	return { loading, result, error };
}
