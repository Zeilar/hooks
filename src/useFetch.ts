import { useState, useEffect } from "react";

export type Status = "loading" | "error" | "success";
export type Dependencies = Record<any, boolean>;

/**
 * Budget deep compare, it won't work if order of keys changes.
 */
export function isEqual(foo: any, bar: any) {
	return JSON.stringify(foo) === JSON.stringify(bar);
}

export interface UseFetchLoadingReturn<T = any> {
	data: T | undefined;
	status: "loading";
	loading: true;
	error: false;
	success: false;
}

export interface UseFetchSuccessReturn<T = any> {
	data: T;
	status: "success";
	loading: false;
	error: false;
	success: true;
}

export interface UseFetchErrorReturn<T = any> {
	data: T | undefined;
	status: "error";
	loading: false;
	error: true;
	success: false;
}

/**
 * Useful for client side rendering.
 * @example const { data, loading, success, error } = useFetch<Post[]>("/api/v1/posts");
 */
export function useFetch<T = any>(url: string, config?: RequestInit, fallback?: T) {
	const [data, setData] = useState<T>(typeof fallback === "function" ? fallback() : fallback);
	const [status, setStatus] = useState<Status>("loading");
	const [configState, setConfigState] = useState(config);

	const success = status === "success";
	const error = status === "error";
	const loading = status === "loading";

	useEffect(() => {
		if (!isEqual(config, configState)) {
			setConfigState(config);
		}
	}, [config, configState]);

	useEffect(() => {
		(async () => {
			setStatus("loading");
			try {
				const response = await fetch(url, configState);
				if (response.ok) {
					setData(
						response.headers.get("Content-Type")?.includes("application/json")
							? await response.json()
							: await response.text()
					);
				}
				setStatus(response.ok ? "success" : "error");
			} catch (error) {
				console.error(error);
				setStatus("error");
			}
		})();
	}, [url, configState]);

	const result = {
		data,
		status,
		success,
		error
	};

	if (loading) {
		return result as UseFetchLoadingReturn<T>;
	}

	if (success) {
		return result as UseFetchSuccessReturn<T>;
	}

	if (error) {
		return result as UseFetchErrorReturn<T>;
	}

	return result as UseFetchErrorReturn<T>;
}
